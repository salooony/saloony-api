import { Injectable } from '@nestjs/common';
import { IMessage } from '../../domain/message/message.interface';
import { SmsMessage } from '../../domain/message/sms.message';
import { INotifierChannel } from '../../domain/ports/notifier-channel.interface';

@Injectable()
export class SmsChannel implements INotifierChannel {
  notify(message: SmsMessage): Promise<void> {
    console.log(`Sending SMS to ${message.to}: ${message.content}`);
    return Promise.resolve();
  }

  supports(message: IMessage): boolean {
    return message instanceof SmsMessage;
  }
}
