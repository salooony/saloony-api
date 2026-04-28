import { Salon as SalonSchema } from '@salon/infrastructure/schemas/salon.entity';
import { Salon } from '@salon/domain/entities/salon';

export class SalonMapper {
  /** Maps a persistence schema to its domain entity. */
  public static toDomain(schema: SalonSchema): Salon {
    const domain = new Salon();
    domain.id = schema.id;
    domain.name = schema.name;
    domain.description = schema.description;
    domain.address = schema.address;
    domain.createdAt = schema.createdAt;
    domain.updatedAt = schema.updatedAt;
    domain.isDeleted = schema.isDeleted;
    domain.deletedAt = schema.deletedAt || null;

    return domain;
  }

  /** Maps a domain entity to its persistence schema. */
  public static toPersistence(domain: Salon): SalonSchema {
    const schema = new SalonSchema();
    schema.id = domain.id;
    schema.name = domain.name;
    schema.description = domain.description;
    schema.addressId = domain.address?.id;
    schema.createdAt = domain.createdAt;
    schema.updatedAt = domain.updatedAt;
    schema.isDeleted = domain.isDeleted;
    schema.deletedAt = domain.deletedAt || undefined;

    return schema;
  }
}
