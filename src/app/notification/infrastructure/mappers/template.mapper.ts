import { Template as DomainTemplate } from '../../domain/entities/template';
import { Template as SchemaTemplate } from '../schemas/template.schema';

export class TemplateMapper {
  public static toDomain(schema: SchemaTemplate | null): DomainTemplate | null {
    if (!schema) return null;

    const domain = new DomainTemplate();
    domain.id = schema.id;
    domain.key = schema.key;
    domain.type = schema.type;
    domain.title = schema.title;
    domain.message = schema.message;
    domain.defaultParameters = schema.defaultParameters;
    domain.metadata = schema.metadata;
    domain.isActive = schema.isActive;
    domain.createdAt = schema.createdAt;
    domain.updatedAt = schema.updatedAt;

    return domain;
  }

  public static toSchema(domain: DomainTemplate): SchemaTemplate {
    const schema = new SchemaTemplate();
    if (domain.id) schema.id = domain.id;
    schema.key = domain.key;
    schema.type = domain.type;
    schema.title = domain.title;
    schema.message = domain.message;
    schema.defaultParameters = domain.defaultParameters;
    schema.metadata = domain.metadata;
    schema.isActive = domain.isActive;
    if (domain.createdAt) schema.createdAt = domain.createdAt;
    if (domain.updatedAt) schema.updatedAt = domain.updatedAt;

    return schema;
  }
}
