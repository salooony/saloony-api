import { IMessage } from './message.interface';

export class SmsMessage extends IMessage {
  constructor(
    to: string,
    private readonly content: string,
  ) {
    super(to);
  }

  getContent(): string {
    return this.content;
  }
}
