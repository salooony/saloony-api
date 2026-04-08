import { Template } from '../../domain/entities/template';
import { Template as TemplateSchema } from '../schemas/template.schema';

export class TemplateMapper {
  public static toDomain(schema: TemplateSchema | null): Template | null {
    if (!schema) return null;

    const domain = new Template();
    domain.id = schema.id;
    domain.key = schema.key;
    domain.type = schema.type;
    domain.title = schema.title;
    domain.message = schema.message;
    domain.defaultParameters = schema.defaultParameters;
    domain.createdAt = schema.createdAt;

    return domain;
  }

  public static toSchema(domain: Template): TemplateSchema {
    const schema = new TemplateSchema();
    if (domain.id) schema.id = domain.id;
    schema.key = domain.key;
    schema.type = domain.type;
    schema.title = domain.title;
    schema.message = domain.message;
    schema.defaultParameters = domain.defaultParameters;
    if (domain.createdAt) schema.createdAt = domain.createdAt;

    return schema;
  }
}
