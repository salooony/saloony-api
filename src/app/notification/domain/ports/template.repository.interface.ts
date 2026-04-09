import { Template } from '../entities/template';
import { NotificationType } from '../enums/notification-type.enum';

export const TEMPLATE_REPOSITORY = 'ITemplateRepository';

export interface ITemplateRepository {
  findAll(): Promise<Template[]>;
  findByKey(key: string, type: NotificationType): Promise<Template | null>;
  save(template: Template): Promise<Template>;
  deleteByKey(key: string, type: NotificationType): Promise<void>;
}
