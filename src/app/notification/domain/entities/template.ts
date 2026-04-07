import { NotificationType } from '../enums/notification-type.enum';

export class Template {
  public readonly id: string;
  public key: string;
  public type: NotificationType;
  public title: string;
  public message: string;
  public defaultParameters: Record<string, any>;
  public readonly createdAt: Date;

  updateContent(title?: string, message?: string): void {
    if (title !== undefined) this.title = title;
    if (message !== undefined) this.message = message;
  }

  updateKey(key: string): void {
    this.key = key;
  }

  updateType(type: NotificationType): void {
    this.type = type;
  }

  updateParameters(params: Record<string, any>): void {
    this.defaultParameters = params;
  }
}
