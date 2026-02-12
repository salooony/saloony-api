import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMessage } from '../../domain/message/message.interface';
import { EmailMessage } from '../../domain/message/email.message';
import { INotifierChannel } from '../../domain/ports/notifier-channel.interface';

@Injectable()
export class EmailChannel implements INotifierChannel {
  private readonly logger = new Logger(EmailChannel.name);

  constructor(private readonly mailerService: MailerService) {}

  async notify(message: EmailMessage): Promise<void> {
    const body = message.getContent().trim();

    if (!body) {
      this.logger.error(`Email body is empty. Message to ${message.to} not sent.`);
      return;
    }

    try {
      await this.mailerService.sendMail({
        to: message.to,
        subject: message.subject,
        text: body,
      });
      this.logger.log(`Email sent to ${message.to}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Email send error for ${message.to}: ${errorMessage}`);
    }
  }

  supports(message: IMessage): boolean {
    return message instanceof EmailMessage;
  }
}
