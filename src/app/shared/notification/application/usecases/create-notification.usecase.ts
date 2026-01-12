import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../infrastructure/schemas/notification.entity';
import { NotificationType, NotificationTemplateKey } from '../../domain/enums/notification-type.enum';
import { NotificationStatus } from '../../domain/enums/notification-status.enum';

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async execute(
    userId: string,
    type: NotificationType,
    data: {
      title: string;
      message: string;
      templateKey?: NotificationTemplateKey;
      parameters?: Record<string, any>;
      metadata?: Record<string, any>;
    },
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      recipientId: userId,
      type,
      status: NotificationStatus.UNREAD,
      templateKey: data.templateKey,
      parameters: data.parameters,
      title: data.title,
      message: data.message,
      metadata: data.metadata,
    });

    return await this.notificationRepository.save(notification);
  }
}
