import { MessageAbstruct } from './MessageAbstruct';
import { TemplateContext } from './message.interface';

export class SmsMessage extends MessageAbstruct {
  constructor(to: string, templateKey: string, context: TemplateContext) {
    super(to, templateKey, context);
  }

  getContent(): string {
    return this.renderTemplate();
  }
}
