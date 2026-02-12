import { IMessage, TemplateContext } from './message.interface';

export abstract class MessageAbstruct implements IMessage {
  private static readonly templates = new Map<string, string>();

  public static registerTemplate(key: string, template: string): void {
    MessageAbstruct.templates.set(key, template);
  }

  public static registerTemplates(templates: Record<string, string>): void {
    for (const [key, template] of Object.entries(templates)) {
      MessageAbstruct.templates.set(key, template);
    }
  }

  constructor(
    public readonly to: string,
    public readonly templateKey: string,
    public readonly context: TemplateContext,
  ) {}

  protected renderTemplate(): string {
    const template = MessageAbstruct.templates.get(this.templateKey);
    if (!template) {
      return '';
    }

    return template.replace(/{{\s*([^{}\s]+)\s*}}/g, (_match, key: string) => {
      const value = this.resolveContextValue(key);
      return this.stringifyTemplateValue(value);
    });
  }

  private stringifyTemplateValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'bigint'
    ) {
      return `${value}`;
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (typeof value === 'symbol') {
      return value.description ?? '';
    }

    try {
      return JSON.stringify(value);
    } catch {
      return '';
    }
  }

  protected resolveContextValue(path: string): unknown {
    const segments = path.split('.');
    let current: unknown = this.context;

    for (const segment of segments) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }

      const record = current as Record<string, unknown>;
      if (!(segment in record)) {
        return undefined;
      }

      current = record[segment];
    }

    return current;
  }

  abstract getContent(): string;
}
