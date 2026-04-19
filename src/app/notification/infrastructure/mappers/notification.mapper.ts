import { Notification } from '../../domain/entities/notification';
import { Notification as NotificationSchema } from '../schemas/notification.schema';

export class NotificationMapper {
  public static map(schema: NotificationSchema | null): Notification | null {
    if (!schema) return null;

    const domain = new Notification();
    domain.id = schema.id;
    domain.userId = schema.userId;
    domain.type = schema.type;
    domain.title = schema.title;
    domain.content = schema.content;
    domain.isRead = schema.isRead;
    domain.readAt = schema.readAt;
    domain.createdAt = schema.createdAt;

    return domain;
  }

  public static toSchema(domain: Notification): NotificationSchema {
    const schema = new NotificationSchema();
    schema.id = domain.id;
    schema.userId = domain.userId;
    schema.type = domain.type;
    schema.title = domain.title;
    schema.content = domain.content;
    schema.isRead = domain.isRead;
    schema.readAt = domain.readAt;
    schema.createdAt = domain.createdAt;

    return schema;
  }
}
