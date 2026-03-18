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
    await this.mailerService.sendMail({
      to: message.to,
      subject: message.subject,
      text: message.content,
    });

    this.logger.log(`Email sent to ${message.to} with subject "${message.subject}"`);
  }

  supports(message: IMessage): boolean {
    return message instanceof EmailMessage;
  }
}
