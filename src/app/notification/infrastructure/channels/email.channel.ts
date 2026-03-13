import { Injectable, Logger } from '@nestjs/common';
import { IMessage } from '../../domain/message/message.interface';
import { EmailMessage } from '../../domain/message/email.message';
import { INotifierChannel } from '../../domain/ports/notifier-channel.interface';

@Injectable()
export class EmailChannel implements INotifierChannel {
  private readonly logger = new Logger(EmailChannel.name);

  notify(message: EmailMessage): Promise<void> {
    this.logger.log(`Sending Email to ${message.to} with subject "${message.subject}": ${message.content}`);
    return Promise.resolve();
  }

  supports(message: IMessage): boolean {
    return message instanceof EmailMessage;
  }
}
