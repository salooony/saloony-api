import { IMessage } from './message.interface';

export class SmsMessage implements IMessage {
  constructor(
    public readonly to: string,
    public readonly content: string,
  ) {}
}
