import { Service as ServiceSchema } from '../schemas/service.entity';
import { Service } from '../../domain/entities/service';

/** Maps between Service persistence schema and Service domain entity. */
export class ServiceMapper {
  /** Maps a persistence schema to its domain entity. */
  public static toDomain(entity: ServiceSchema): Service {
    const domain = new Service();
    domain.name = entity.name;
    domain.description = entity.description;
    domain.category = entity.category;
    domain.active = entity.active;
    domain.activatedAt = entity.activatedAt;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    domain.deletedAt = entity.deletedAt ?? null;
    return domain;
  }

  /** Maps a domain entity to its persistence schema. */
  public static toSchema(domain: Service): ServiceSchema {
    const entity = new ServiceSchema();
    entity.name = domain.name;
    entity.description = domain.description;
    entity.category = domain.category;
    entity.active = domain.active;
    entity.activatedAt = domain.activatedAt;
    // createdAt / updatedAt intentionally omitted — managed automatically by TypeORM
    entity.deletedAt = domain.deletedAt ?? null;
    return entity;
  }
}
