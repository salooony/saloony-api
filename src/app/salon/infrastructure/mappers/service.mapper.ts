import { Service as ServiceSchema } from '../schemas/service.entity';
import { Service } from '../../domain/entities/service';
import { ServiceCategory } from '../../domain/entities/service-category';

/** Maps between Service persistence schema and Service domain entity. */
export class ServiceMapper {
  /** Maps a persistence schema to its domain entity. */
  public static toDomain(entity: ServiceSchema): Service {
    const domain = new Service();
    domain.id = entity.name;
    domain.name = entity.name;
    domain.description = entity.description ?? '';
    domain.categoryId = entity.categoryId;
    const category = new ServiceCategory();
    category.id = entity.categoryId;
    category.name = entity.categoryId;
    domain.category = category;
    domain.active = entity.active;
    domain.activatedAt = entity.activatedAt;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    if (entity.deletedAt) {
      domain.deletedAt = entity.deletedAt;
    }
    return domain;
  }

  /** Maps a domain entity to its persistence schema. */
  public static toSchema(domain: Service): ServiceSchema {
    const entity = new ServiceSchema();
    entity.name = domain.name;
    entity.description = domain.description;
    entity.categoryId = domain.categoryId;
    entity.active = domain.active;
    entity.activatedAt = domain.activatedAt;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;
    return entity;
  }
}
