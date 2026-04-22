// Domain exports
export * from './domain/entities/template';
export * from './domain/entities/notification';
export * from './domain/enums/notification-type.enum';
export * from './domain/ports/itemplate.repository';
export * from './domain/ports/inotification.repository';

// Application exports
export { TemplateRendererService } from './application/services/template-renderer.service';

// Infrastructure exports
export { NotificationModule } from './infrastructure/modules/notification.module';
export { TemplateModule } from './infrastructure/modules/template.module';
export { NotificationRepository } from './infrastructure/repositories/notification.repository';
export { Notification } from './infrastructure/schemas/notification.schema';
