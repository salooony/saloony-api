import { ServiceCategory as ServiceCategorySchema } from '../schemas/service-category.entity';
import { ServiceCategory } from '../../domain/entities/service-category';

/** Maps between ServiceCategorySchema and ServiceCategory domain entity. */
export class ServiceCategoryMapper {
  /** Maps a persistence schema to its domain entity. */
  public static toDomain(entity: ServiceCategorySchema): ServiceCategory {
    const domain = new ServiceCategory();
    domain.id = entity.name;
    domain.name = entity.name;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    return domain;
  }

  /** Maps a domain entity to its persistence schema. */
  public static toSchema(domain: ServiceCategory): ServiceCategorySchema {
    const entity = new ServiceCategorySchema();
    entity.name = domain.name;
    return entity;
  }
}
