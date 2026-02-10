import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TemplateModule } from './template.module';
import { NotifierService } from '../../application/services/notifier.service';
import { SmsChannel } from '../channels/sms.channel';
import { EmailChannel } from '../channels/email.channel';
import { WhatsAppWebChannel } from '../channels/whatsapp-web.channel';

function parseBoolean(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return ['true', '1', 'yes', 'on'].includes(normalized);
}

@Module({
  imports: [
    TemplateModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: Number(configService.get<string>('SMTP_PORT') ?? 587),
          secure: parseBoolean(configService.get<string>('SMTP_SECURE')),
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: configService.get<string>('EMAIL_FROM') ?? configService.get<string>('SMTP_USER'),
        },
      }),
    }),
  ],
  providers: [
    SmsChannel,
    EmailChannel,
    WhatsAppWebChannel,
    {
      provide: 'NOTIFIER_CHANNELS',
      useFactory: (configService: ConfigService, wa: WhatsAppWebChannel, sms: SmsChannel, email: EmailChannel) => {
        const nodeEnvRaw = configService.get<string>('NODE_ENV') ?? process.env.NODE_ENV ?? '';
        const nodeEnv = nodeEnvRaw.trim().toLowerCase();

        const waEnabled = parseBoolean(configService.get<string>('WA_WEB_ENABLED'));
        const isDevOrTest = nodeEnv === 'development' || nodeEnv === 'test' || !nodeEnv;
        const allowWa = waEnabled && isDevOrTest && nodeEnv !== 'production';

        // WhatsApp channel must be before SmsChannel because SmsChannel supports all SmsMessage.
        return allowWa ? [wa, sms, email] : [sms, email];
      },
      inject: [ConfigService, WhatsAppWebChannel, SmsChannel, EmailChannel],
    },
    NotifierService,
  ],
  exports: [TemplateModule, NotifierService],
})
export class NotificationModule {}
