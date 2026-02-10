export abstract class IMessage {
  constructor(public readonly to: string) {}

  abstract getContent(): string;
}
