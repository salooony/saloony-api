import { IMessage } from '../message/message.interface';

export interface INotifierChannel {
  notify(message: IMessage): Promise<void>;
  supports(message: IMessage): boolean;
}
