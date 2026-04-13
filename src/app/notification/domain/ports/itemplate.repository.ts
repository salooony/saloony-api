import { Template } from '../entities/template';
import { NotificationType } from '../enums/notification-type.enum';

export const TEMPLATE_REPOSITORY = 'ITemplateRepository';

export interface ITemplateRepository {
  save(template: Template): Promise<Template>;
  findAll(): Promise<Template[]>;
  findByKey(key: string, type: NotificationType): Promise<Template | null>;
  deleteByKey(key: string, type: NotificationType): Promise<void>;
}
