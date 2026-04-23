import { ServiceEntity } from '../schemas/service.entity';
import { Service } from '../../domain/entities/service';

export class ServiceMapper {
  public static toDomain(entity: ServiceEntity): Service {
    const domain = new Service();
    domain.id = entity.id;
    domain.salonId = entity.salonId;
    domain.name = entity.name;
    domain.description = entity.description ?? null;
    domain.category = entity.category ?? null;
    domain.active = entity.active;
    domain.activatedAt = entity.activatedAt ?? null;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    domain.deletedAt = entity.deletedAt ?? null;

    return domain;
  }

  public static toPersistence(domain: Service): ServiceEntity {
    const entity = new ServiceEntity();
    entity.id = domain.id!;
    entity.salonId = domain.salonId!;
    entity.name = domain.name!;
    entity.description = domain.description ?? null;
    entity.category = domain.category ?? null;
    entity.active = domain.active;
    entity.activatedAt = domain.activatedAt ?? null;
    entity.createdAt = domain.createdAt!;
    entity.updatedAt = domain.updatedAt!;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
