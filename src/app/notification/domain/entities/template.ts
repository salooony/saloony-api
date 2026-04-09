import { NotificationType } from '../enums/notification-type.enum';
import { TemplateUpdateProps } from '../types/template-update.props';

export class Template {
  public key: string;
  public type: NotificationType;
  public title: string;
  public message: string;
  public defaultParameters: Record<string, any>;
  public createdAt: Date;
  public updatedAt?: Date;

  setContent(title?: string, message?: string): void {
    if (title !== undefined) this.title = title;
    if (message !== undefined) this.message = message;
  }

  setKey(key: string): void {
    this.key = key;
  }

  setType(type: NotificationType): void {
    this.type = type;
  }

  setParameters(params: Record<string, any>): void {
    this.defaultParameters = params;
  }

  applyUpdates(props: TemplateUpdateProps): void {
    if (props.title !== undefined) this.title = props.title;
    if (props.message !== undefined) this.message = props.message;
    if (props.key !== undefined) this.key = props.key;
    if (props.type !== undefined) this.type = props.type;

    if (props.defaultParameters !== undefined) {
      this.defaultParameters = props.defaultParameters;
    }

    this.updatedAt = new Date();
  }
}
