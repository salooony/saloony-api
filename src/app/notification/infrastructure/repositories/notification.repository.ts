import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification as NotificationSchema } from '../schemas/notification.schema';
import { INotificationRepository } from '../../domain/ports/inotification.repository';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(@InjectRepository(NotificationSchema) private readonly repository: Repository<NotificationSchema>) {}

  async markAsRead(id: string): Promise<void> {
    await this.repository.update(id, {
      isRead: true,
      readAt: new Date(),
    });
  }
}
