import { Template as DomainTemplate } from '../../domain/entities/template';
import { Template as SchemaTemplate } from '../schemas/template.schema';

export class TemplateMapper {
  public static toDomain(schema: SchemaTemplate | null): DomainTemplate | null {
    if (!schema) return null;

    const domain = new DomainTemplate();
    domain.id = schema.id;
    domain.key = schema.key;
    domain.title = schema.title;
    domain.message = schema.message;
    domain.defaultParameters = schema.defaultParameters;
    domain.createdAt = schema.createdAt;

    return domain;
  }

  public static toSchema(domain: DomainTemplate): SchemaTemplate {
    const schema = new SchemaTemplate();
    if (domain.id) schema.id = domain.id;
    schema.key = domain.key;
    schema.title = domain.title;
    schema.message = domain.message;
    schema.defaultParameters = domain.defaultParameters;
    if (domain.createdAt) schema.createdAt = domain.createdAt;

    return schema;
  }
}
