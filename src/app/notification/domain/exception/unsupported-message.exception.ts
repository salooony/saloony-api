export class UnsupportedMessageException extends Error {
  constructor(messageType: string) {
    super(`No channel supports message type: ${messageType}`);
    this.name = 'UnsupportedMessageException';
  }
}
