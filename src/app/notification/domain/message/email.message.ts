import { MessageAbstruct } from './MessageAbstruct';
import { TemplateContext } from './message.interface';

export class EmailMessage extends MessageAbstruct {
  constructor(
    to: string,
    public readonly subject: string,
    templateKey: string,
    context: TemplateContext,
  ) {
    super(to, templateKey, context);
  }

  getContent(): string {
    return this.renderTemplate();
  }
}
