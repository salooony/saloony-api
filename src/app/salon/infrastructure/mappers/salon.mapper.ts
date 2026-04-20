import { Salon } from '../../domain/entities/salon';
import { Salon as SalonSchema } from '../schemas/salon.entity';
export class SalonMapper {
  /**
   * Maps a Salon infrastructure schema to a Salon domain entity.
   * @param schema The infrastructure schema.
   * @returns The domain entity or null if schema is null.
   */
  public static map(schema: SalonSchema | null): Salon | null {
    if (!schema) return null;

    const domain = new Salon();
    domain.id = schema.id;
    domain.name = schema.name;
    domain.description = schema.description;
    domain.addressId = schema.addressId;
    domain.createdAt = schema.createdAt;
    domain.updatedAt = schema.updatedAt;
    domain.deletedAt = schema.deletedAt || null;
    domain.isDeleted = schema.isDeleted;

    return domain;
  }

  /**
   * Maps a Salon domain entity to a Salon infrastructure schema.
   * @param domain The domain entity.
   * @returns The infrastructure schema.
   */
  public static toSchema(domain: Salon): SalonSchema {
    const schema = new SalonSchema();

    schema.id = domain.id;
    schema.name = domain.name;
    schema.description = domain.description;
    schema.addressId = domain.addressId;
    schema.createdAt = domain.createdAt;
    schema.updatedAt = domain.updatedAt;
    schema.deletedAt = domain.deletedAt || undefined;
    schema.isDeleted = domain.isDeleted;

    return schema;
  }
}
