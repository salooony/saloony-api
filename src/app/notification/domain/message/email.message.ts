import { IMessage } from './message.interface';

export class EmailMessage extends IMessage {
  constructor(
    to: string,
    public readonly subject: string,
    private readonly content: string,
  ) {
    super(to);
  }

  getContent(): string {
    return this.content;
  }
}
