import { Address } from '@address/domain/entities/address.entity';
import { Address as AddressSchema } from '../schemas/address.schema';

export class AddressMapper {
  static toDomain(entity: AddressSchema): Address {
    return new Address(
      entity.id,
      {
        latitude: entity.location.latitude,
        longitude: entity.location.longitude,
      },
      entity.postcode,
      entity.cityId,
      entity.address,
      entity.complement,
    );
  }

  static toEntity(domain: Address): AddressSchema {
    const entity = new AddressSchema();

    entity.id = domain.id;
    entity.location = {
      latitude: domain.location.latitude,
      longitude: domain.location.longitude,
    };
    entity.postcode = domain.postcode;
    entity.cityId = domain.cityId;
    entity.address = domain.address;
    entity.complement = domain.complement;

    return entity;
  }
}
