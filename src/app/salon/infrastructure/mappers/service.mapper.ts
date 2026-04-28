import { Service } from '../schemas/service.entity';
import { Service as ServiceDomain } from '../../domain/entities/service';
import { ServiceCategoryMapper } from './service-category.mapper';

/** Maps between Service persistence schema and Service domain entity. */
export class ServiceMapper {
  /** Maps a persistence schema to its domain entity. */
  public static toDomain(entity: Service): ServiceDomain {
    const domain = new ServiceDomain();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.description = entity.description ?? null;
    domain.categoryId = entity.categoryId;
    domain.category = entity.category ? ServiceCategoryMapper.toDomain(entity.category) : null;
    domain.active = entity.active;
    domain.activatedAt = entity.activatedAt;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    domain.deletedAt = entity.deletedAt ?? null;
    return domain;
  }

  /** Maps a domain entity to its persistence schema. */
  public static toPersistence(domain: ServiceDomain): Service {
    const entity = new Service();
    entity.id = domain.id!;
    entity.name = domain.name!;
    entity.description = domain.description ?? null;
    entity.categoryId = domain.categoryId!;
    entity.active = domain.active;
    entity.activatedAt = domain.activatedAt!;
    entity.createdAt = domain.createdAt!;
    entity.updatedAt = domain.updatedAt!;
    entity.deletedAt = domain.deletedAt ?? null;
    return entity;
  }
}
