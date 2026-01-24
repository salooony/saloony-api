import { Template } from '../entities/template';

export interface ITemplateRepository {
  findByKey(key: string): Promise<Template | null>;

  findAllActive(): Promise<Template[]>;

  save(template: Template): Promise<Template>;

  delete(id: string): Promise<void>;
}
