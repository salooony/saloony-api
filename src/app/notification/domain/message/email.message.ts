import { IMessage } from './message.interface';

export class EmailMessage implements IMessage {
  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly content: string,
  ) {}
}
