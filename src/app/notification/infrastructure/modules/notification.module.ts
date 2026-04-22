import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateModule } from './template.module';
import { Notification, NOTIFICATION_REPOSITORY, NotificationRepository } from '@notification';

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
})
export class NotificationModule {}
