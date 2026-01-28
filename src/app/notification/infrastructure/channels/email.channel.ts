import { Injectable } from '@nestjs/common';
import { IMessage } from '../../domain/message/message.interface';
import { EmailMessage } from '../../domain/message/email.message';
import { INotifierChannel } from '../../domain/ports/notifier-channel.interface';

@Injectable()
export class EmailChannel implements INotifierChannel {
  notify(message: EmailMessage): void {
    console.log(`Sending Email to ${message.to} with subject "${message.subject}": ${message.content}`);
  }

  supports(message: IMessage): boolean {
    return message instanceof EmailMessage;
  }
}
