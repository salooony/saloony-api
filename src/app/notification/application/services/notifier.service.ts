import { Inject, Injectable } from '@nestjs/common';
import { IMessage } from '../../domain/message/message.interface';
import { INotifierChannel } from '../../domain/ports/notifier-channel.interface';
import { UnsupportedMessageException } from '../../domain/exception/unsupported-message.exception';

@Injectable()
export class NotifierService {
  constructor(
    @Inject('NOTIFIER_CHANNELS')
    private readonly channels: INotifierChannel[],
  ) {}

  async notify(message: IMessage): Promise<void> {
    const channel = this.channels.find((c) => c.supports(message));
    if (!channel) {
      throw new UnsupportedMessageException(message.constructor.name);
    }
    await channel.notify(message);
  }
}
