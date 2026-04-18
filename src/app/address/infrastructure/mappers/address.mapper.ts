import { Address } from '@address/domain/entities/address.entity';
import { Address as AddressSchema } from '../schemas/address.schema';

export class AddressMapper {
  static toDomain(entity: AddressSchema): Address {
    return new Address(entity.id, entity.location, entity.postcode, entity.cityId, entity.address, entity.complement);
  }

  static toEntity(domain: Address): AddressSchema {
    const entity = new AddressSchema();

    entity.id = domain.id;
    entity.location = domain.location;
    entity.postcode = domain.postcode;
    entity.cityId = domain.cityId;
    entity.address = domain.address;
    entity.complement = domain.complement;

    return entity;
  }
}
