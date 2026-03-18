import { Template } from '../entities/template';

export interface ITemplateRepository {
  findByKey(key: string): Promise<Template | null>;

  save(template: Template): Promise<Template>;
}
