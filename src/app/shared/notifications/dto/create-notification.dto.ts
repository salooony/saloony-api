import { IsEnum, IsNotEmpty, IsOptional, IsUUID, IsObject } from 'class-validator';
import { NotificationTemplateKey, NotificationType } from '../enums/notification-type.enum';

export class CreateNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @IsEnum(NotificationTemplateKey)
  @IsNotEmpty()
  templateKey: NotificationTemplateKey;

  @IsObject()
  @IsOptional()
  parameters?: Record<string, any>;

  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
