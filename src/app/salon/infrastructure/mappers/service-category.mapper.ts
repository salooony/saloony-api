import { ServiceCategoryEntity } from '../schemas/service-category.entity';
import { ServiceCategory } from '../../domain/entities/service-category';

/** Maps between ServiceCategoryEntity and ServiceCategory domain entity. */
export class ServiceCategoryMapper {
  /** Maps a persistence schema to its domain entity. */
  public static toDomain(entity: ServiceCategoryEntity): ServiceCategory {
    const domain = new ServiceCategory();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    return domain;
  }

  /** Maps a domain entity to its persistence schema. */
  public static toPersistence(domain: ServiceCategory): ServiceCategoryEntity {
    const entity = new ServiceCategoryEntity();
    entity.id = domain.id!;
    entity.name = domain.name!;
    return entity;
  }
}
