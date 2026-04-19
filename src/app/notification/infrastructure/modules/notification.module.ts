import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateModule } from './template.module';
import { Notification } from '@notification/infrastructure/schemas/notification.schema';
import { NotificationRepository } from '@notification/infrastructure/repositories/notification.repository';
import { NOTIFICATION_REPOSITORY } from '@notification/domain/ports/inotification.repository';

/**
 * NotificationModule
 *
 * Main module that aggregates all notification-related functionality.
 * This module organizes and exports:
 * - Template management (CRUD operations for notification templates)
 * - Template rendering service
 * - Notification repository for persistence operations
 *
 * The module follows a clean architecture pattern with separate layers:
 * - Domain: Core entities, enums, interfaces, and business logic
 * - Application: Use cases, services, DTOs, and transformers
 * - Infrastructure: Controllers, repositories, schemas, and providers
 */
@Module({
  imports: [TypeOrmModule.forFeature([Notification]), TemplateModule],
  providers: [
    NotificationRepository,
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: NotificationRepository,
    },
  ],
  exports: [NOTIFICATION_REPOSITORY, TemplateModule],
})
export class NotificationModule {}
