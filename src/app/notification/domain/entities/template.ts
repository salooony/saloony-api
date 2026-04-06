import { NotificationType } from '../enums/notification-type.enum';

export class Template {
  public id: string;
  public key: string;
  public type: NotificationType;
  public title: string;
  public message: string;
  public defaultParameters: Record<string, any>;
  public createdAt: Date;
  update(data: Partial<Pick<this, 'key' | 'type' | 'title' | 'message' | 'defaultParameters'>>): void {
    if (data.key) this.key = data.key;
    if (data.type) this.type = data.type;
    if (data.title) this.title = data.title;
    if (data.message) this.message = data.message;
    if (data.defaultParameters) this.defaultParameters = data.defaultParameters;
  }
}
