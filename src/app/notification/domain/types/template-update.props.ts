import { NotificationType } from '../enums/notification-type.enum';

export interface TemplateUpdateProps {
  key?: string;
  type?: NotificationType;
  title?: string;
  message?: string;
  defaultParameters?: Record<string, any>;
}
