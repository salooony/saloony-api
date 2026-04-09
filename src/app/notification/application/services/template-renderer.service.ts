import { Injectable } from '@nestjs/common';
import { Template } from '@notification/domain/entities/template';

/**
 * Service responsible for rendering notification templates by replacing placeholders with actual values.
 */
@Injectable()
export class TemplateRendererService {
  /**
   * Renders a template by merging default parameters with provided ones and replacing placeholders in title and message.
   *
   * @example
   * const template = {
   *   title: "Hello {{name}}",
   *   message: "Your code is {{code}}",
   *   defaultParameters: { name: "Guest" }
   * };
   * const result = service.render(template, { code: 123456 });
   * // Result: { title: "Hello Guest", message: "Your code is 123456" } 👌
   *
   * @param template - The template entity containing the raw text and default parameters.
   * @param parameters - Optional runtime parameters to override or complement default ones.
   * @returns An object containing the rendered title and message.
   */
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

  /**
   * Replaces placeholders in the format {{variableName}} with values from the provided record.
   * Supports string, number, and boolean values. If a key is missing or invalid, the placeholder remains unchanged.
   *
   * @param text - The raw text containing placeholders.
   * @param values - A record of keys and their corresponding replacement values.
   * @returns The rendered text.
   * @private
   */
  private renderText(text: string, values: Record<string, unknown>): string {
    return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key: string) => {
      const value = values[key];
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
        ? String(value)
        : match;
    });
  }
}
