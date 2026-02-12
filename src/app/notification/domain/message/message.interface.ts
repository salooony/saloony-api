export type TemplateContext = Record<string, unknown>;

export interface IMessage {
  to: string;
  templateKey: string;
  context: TemplateContext;
  getContent(): string;
}
