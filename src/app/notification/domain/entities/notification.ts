import { NotificationType } from '../enums/notification-type.enum';

export class Notification {
  public id: string;
  public userId: string;
  public type: NotificationType;
  public title: string;
  public content: string;
  public isRead: boolean;
  public readAt?: Date;
  public createdAt: Date;

  public markAsRead(): void {
    this.isRead = true;
    this.readAt = new Date();
  }
}
