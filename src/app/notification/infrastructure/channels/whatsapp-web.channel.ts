import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { IMessage } from '../../domain/message/message.interface';
import { SmsMessage } from '../../domain/message/sms.message';
import { INotifierChannel } from '../../domain/ports/notifier-channel.interface';

/**
 * PoC-only WhatsApp channel using whatsapp-web.js (WhatsApp Web).
 *
 * Guardrails:
 * - Disabled in production.
 * - Feature-flagged by WA_WEB_ENABLED.
 * - Sends OTP only (SmsMessage content must include a 4-8 digit code).
 * - Simple in-memory per-number rate-limit to reduce ban risk.
 */
@Injectable()
export class WhatsAppWebChannel implements INotifierChannel, OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(WhatsAppWebChannel.name);

  private client: Client | null = null;
  private ready = false;
  private initStarted = false;

  // chatId -> last sent epoch ms
  private readonly lastSentAtMsByChatId = new Map<string, number>();

  constructor(private readonly configService: ConfigService) {}

  isEnabled(): boolean {
    return this.getDisabledReason() === null;
  }

  isReady(): boolean {
    return Boolean(this.client) && this.ready;
  }

  async waitUntilReady(timeoutMs = 120_000, pollIntervalMs = 500): Promise<boolean> {
    const disabledReason = this.getDisabledReason();
    if (disabledReason) {
      return false;
    }

    if (!this.initStarted && !this.client) {
      this.onModuleInit();
    }

    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
      if (this.isReady()) {
        return true;
      }
      await this.sleep(pollIntervalMs);
    }

    return this.isReady();
  }

  onModuleInit(): void {
    const disabledReason = this.getDisabledReason();
    if (disabledReason) {
      this.logger.warn(`WhatsAppWebChannel disabled (${disabledReason}).`);
      return;
    }

    if (this.initStarted) {
      return;
    }

    // Don't block Nest bootstrap waiting for auth/QR scanning.
    this.initStarted = true;
    void this.safeInitClient();
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.client) {
      return;
    }

    try {
      await this.client.destroy();
      this.logger.log('WhatsApp client destroyed.');
    } catch (error) {
      this.logger.warn(`WhatsApp client destroy error: ${this.toErrorMessage(error)}`);
    } finally {
      this.client = null;
      this.ready = false;
      this.initStarted = false;
    }
  }

  supports(message: IMessage): boolean {
    if (!(message instanceof SmsMessage)) {
      return false;
    }
    return this.extractOtpCode(message.getContent()) !== null;
  }

  async notify(message: SmsMessage): Promise<void> {
    try {
      const disabledReason = this.getDisabledReason();
      if (disabledReason) {
        this.logger.warn(`WhatsAppWebChannel disabled (${disabledReason}). OTP to ${message.to} not sent.`);
        return;
      }

      const otp = this.extractOtpCode(message.getContent());
      if (!otp) {
        this.logger.warn(`WhatsAppWebChannel supports OTP only. Skipping message to ${message.to}.`);
        return;
      }

      const digits = this.normalizePhoneDigits(message.to);
      const chatId = await this.resolveRegisteredChatId(digits);
      if (!chatId) {
        this.logger.warn(`WhatsApp target number is not registered: ${digits}. OTP not sent.`);
        return;
      }

      const rateLimitMs = this.getRateLimitMs();
      const lastSentAt = this.lastSentAtMsByChatId.get(chatId);
      const now = Date.now();
      if (lastSentAt !== undefined && now - lastSentAt < rateLimitMs) {
        const retryInSeconds = Math.ceil((rateLimitMs - (now - lastSentAt)) / 1000);
        this.logger.warn(`WhatsApp rate-limit: OTP to ${chatId} skipped. Retry in ~${retryInSeconds}s.`);
        return;
      }

      if (!this.client || !this.ready) {
        this.logger.warn(`WhatsApp client not ready. OTP to ${chatId} not sent (scan QR if needed).`);
        return;
      }

      const text = this.formatOtpText(otp);
      const sent = await this.client.sendMessage(chatId, text);
      const messageId = sent?.id?._serialized ?? 'unknown';
      this.logger.log(`WhatsApp OTP send queued: chatId=${chatId}, messageId=${messageId}, ack=${sent.ack}`);

      // Best-effort: wait briefly for server/device ACK to help debugging delivery.
      const ack = await this.waitForAck(messageId, 2, 8000);
      if (ack !== null) {
        this.logger.log(`WhatsApp OTP ACK update: messageId=${messageId}, ack=${ack}`);
      }

      this.lastSentAtMsByChatId.set(chatId, now);
      this.logger.log(`WhatsApp OTP sent to ${chatId}`);
    } catch (error) {
      this.logger.error(`WhatsApp OTP send error: ${this.toErrorMessage(error)}`);
    }
  }

  private async safeInitClient(): Promise<void> {
    try {
      await this.initClient();
    } catch (error) {
      this.logger.error(`WhatsApp init error: ${this.toErrorMessage(error)}`);
    }
  }

  private async initClient(): Promise<void> {
    if (this.client) {
      return;
    }

    const authPath = path.resolve(process.cwd(), '.wwebjs_auth');
    const executablePath = this.getExecutablePath();

    const client = new Client({
      authStrategy: new LocalAuth({
        // Persist session under the repo root folder ".wwebjs_auth"
        dataPath: authPath,
      }),
      puppeteer: {
        headless: true,
        executablePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    client.on('qr', (qr: string) => {
      this.ready = false;
      this.logger.warn('WhatsApp QR received. Scan it from WhatsApp Mobile > Linked Devices.');
      try {
        qrcode.generate(qr, { small: true });
      } catch (error) {
        this.logger.warn(`QR print error: ${this.toErrorMessage(error)}`);
      }
    });

    client.on('authenticated', () => {
      this.logger.log('WhatsApp authenticated.');
    });

    client.on('ready', () => {
      this.ready = true;
      this.logger.log('WhatsApp client ready.');
    });

    client.on('auth_failure', (message: string) => {
      this.ready = false;
      this.logger.error(`WhatsApp auth failure: ${message}`);
    });

    client.on('disconnected', (reason: string) => {
      this.ready = false;
      this.logger.warn(`WhatsApp disconnected: ${reason}`);
    });

    this.client = client;

    await Promise.resolve(client.initialize());
  }

  private getDisabledReason(): string | null {
    const nodeEnvRaw = this.configService.get<string>('NODE_ENV') ?? process.env.NODE_ENV ?? '';
    const nodeEnv = nodeEnvRaw.trim().toLowerCase();

    if (nodeEnv === 'production') {
      return 'NODE_ENV=production';
    }

    // Explicitly allow only dev/test as extra safety for this PoC.
    if (nodeEnv && nodeEnv !== 'development' && nodeEnv !== 'test') {
      return `NODE_ENV=${nodeEnvRaw}`;
    }

    const enabledRaw = this.configService.get<string>('WA_WEB_ENABLED');
    if (!this.parseBoolean(enabledRaw ?? 'false')) {
      return 'WA_WEB_ENABLED=false';
    }

    return null;
  }

  private normalizePhoneDigits(to: string): string {
    const trimmed = (to ?? '').trim();
    if (!trimmed) {
      throw new Error('Phone number is empty.');
    }

    // Keep digits only (removes +, spaces, dashes, parentheses, ...).
    const digitsOnly = trimmed.replace(/[^\d]/g, '');
    if (!digitsOnly) {
      throw new Error(`Invalid phone number: ${to}`);
    }

    return digitsOnly;
  }

  private async resolveRegisteredChatId(digits: string): Promise<string | null> {
    if (!this.client) {
      return null;
    }

    const numberId = await this.client.getNumberId(digits);
    return numberId?._serialized ?? null;
  }

  private extractOtpCode(content: string): string | null {
    const text = (content ?? '').trim();
    if (!text) {
      return null;
    }

    // Most PoCs will pass the code alone.
    if (/^\d{4,8}$/.test(text)) {
      return text;
    }

    // If content contains additional text, extract the first 4-8 digit chunk.
    const match = text.match(/\b(\d{4,8})\b/);
    return match?.[1] ?? null;
  }

  private formatOtpText(code: string): string {
    const ttlMinutes = this.getOtpTtlMinutes();
    if (ttlMinutes) {
      return `Your verification code is ${code}. It expires in ${ttlMinutes} minutes.`;
    }
    return `Your verification code is ${code}.`;
  }

  private getOtpTtlMinutes(): number | null {
    const value = this.configService.get<string>('OTP_TTL_MINUTES');
    const parsed = value ? Number(value) : NaN;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }

  private getRateLimitMs(): number {
    const value = this.configService.get<string>('WA_WEB_RATE_LIMIT_SECONDS');
    const parsed = value ? Number(value) : 60;
    const seconds = Number.isFinite(parsed) && parsed > 0 ? parsed : 60;
    return seconds * 1000;
  }

  private parseBoolean(value: string): boolean {
    const normalized = value.trim().toLowerCase();
    return ['true', '1', 'yes', 'on'].includes(normalized);
  }

  private getExecutablePath(): string | undefined {
    const explicit =
      this.configService.get<string>('WA_WEB_EXECUTABLE_PATH') ??
      this.configService.get<string>('PUPPETEER_EXECUTABLE_PATH') ??
      process.env.PUPPETEER_EXECUTABLE_PATH;

    const resolved = explicit?.trim();
    if (!resolved) {
      return undefined;
    }

    if (!fs.existsSync(resolved)) {
      this.logger.warn(`WhatsApp browser executable not found at: ${resolved}`);
      return undefined;
    }

    return resolved;
  }

  private toErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async waitForAck(messageId: string, desiredAck: number, timeoutMs: number): Promise<number | null> {
    if (!this.client || !messageId || messageId === 'unknown') {
      return null;
    }

    return new Promise((resolve) => {
      const client = this.client!;

      const timer = setTimeout(() => {
        client.off('message_ack', onAck);
        resolve(null);
      }, timeoutMs);

      const onAck = (msg: { id?: { _serialized?: string } }, ack: number) => {
        if (msg?.id?._serialized !== messageId) {
          return;
        }

        if (ack >= desiredAck) {
          clearTimeout(timer);
          client.off('message_ack', onAck);
          resolve(ack);
        }
      };

      client.on('message_ack', onAck);
    });
  }
}
