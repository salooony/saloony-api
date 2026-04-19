import { NotificationType } from '../enums/notification-type.enum';

export class Notification {
  public id: string;
  public userId: string;
  public type: NotificationType;
  public title: string;
  public content: string;
  public isRead: boolean = false;
  public readAt: Date | null = null;
  public createdAt: Date;
}
