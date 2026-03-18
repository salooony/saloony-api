import { Injectable } from '@nestjs/common';
import { Template } from '@notification/domain/entities/template';

@Injectable()
export class TemplateRendererService {
  render(template: Template, parameters: Record<string, unknown> = {}): { title: string; message: string } {
    const values = {
      ...(template.defaultParameters ?? {}),
      ...parameters,
    };

    return {
      title: this.renderText(template.title, values),
      message: this.renderText(template.message, values),
    };
  }

  private renderText(text: string, values: Record<string, unknown>): string {
    return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key: string) => {
      const value = values[key];
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
        ? String(value)
        : match;
    });
  }
}
