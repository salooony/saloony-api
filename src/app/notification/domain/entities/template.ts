import { NotificationType } from '../enums/notification-type.enum';

export class Template {
  public key: string;
  public type: NotificationType;
  public title: string;
  public message: string;
  public defaultParameters: Record<string, any>;
  public createdAt: Date;
  public updatedAt: Date;
}
