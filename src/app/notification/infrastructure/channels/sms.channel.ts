import { Injectable, Logger } from '@nestjs/common';
import { IMessage } from '../../domain/message/message.interface';
import { SmsMessage } from '../../domain/message/sms.message';
import { INotifierChannel } from '../../domain/ports/notifier-channel.interface';

@Injectable()
export class SmsChannel implements INotifierChannel {
  private readonly logger = new Logger(SmsChannel.name);

  notify(message: SmsMessage): Promise<void> {
    this.logger.log(`Sending SMS to ${message.to}: ${message.content}`);
    return Promise.resolve();
  }

  supports(message: IMessage): boolean {
    return message instanceof SmsMessage;
  }
}
