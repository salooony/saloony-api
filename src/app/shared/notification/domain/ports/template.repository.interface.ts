import { Template } from '../../infrastructure/schemas/template.entity';
import { TemplateKey } from '../enums/template-type.enum';

export interface ITemplateRepository {
  /**
   * Find a template by its unique key
   */
  findByKey(key: TemplateKey): Promise<Template | null>;

  /**
   * Create a new template
   */
  create(template: Partial<Template>): Template;

  /**
   * Save a template to the database
   */
  save(template: Template): Promise<Template>;

  /**
   * Find all active templates
   */
  findAllActive(): Promise<Template[]>;

  /**
   * Update an existing template
   */
  update(id: string, updates: Partial<Template>): Promise<Template>;

  /**
   * Delete a template by ID
   */
  delete(id: string): Promise<void>;
}
