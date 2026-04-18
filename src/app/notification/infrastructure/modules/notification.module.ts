import { Module } from '@nestjs/common';
import { TemplateModule } from './template.module';

/**
 * NotificationModule
 *
 * Main module that aggregates all notification-related functionality.
 * This module organizes and exports:
 * - Template management (CRUD operations for notification templates)
 * - Template rendering service
 *
 * The module follows a clean architecture pattern with separate layers:
 * - Domain: Core entities, enums, interfaces, and business logic
 * - Application: Use cases, services, DTOs, and transformers
 * - Infrastructure: Controllers, repositories, schemas, and providers
 */
@Module({
  imports: [TemplateModule],
  exports: [TemplateModule],
})
export class NotificationModule {}
