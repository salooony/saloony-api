export const NOTIFICATION_REPOSITORY = 'INotificationRepository';

export interface INotificationRepository {
  markAsRead(id: string): Promise<void>;
}
