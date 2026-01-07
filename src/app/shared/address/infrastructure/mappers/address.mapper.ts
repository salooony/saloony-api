import { Address } from '@app/shared/address/domain/entities/address';
import { Address as AddressEntity } from '../schemas/address.entity';

export class AddressMapper {
  static map(entity: AddressEntity): Address {
    const address = new Address();

    address.id = entity.id;
    address.street = entity.street;
    address.city = entity.city;
    address.state = entity.state;
    address.zipCode = entity.zipCode;
    address.country = entity.country;
    address.createdAt = entity.createdAt;
    address.updatedAt = entity.updatedAt;

    return address;
  }

  static toEntity(address: Address): AddressEntity {
    const entity = new AddressEntity();

    entity.street = address.street;
    entity.city = address.city;
    entity.state = address.state;
    entity.zipCode = address.zipCode;
    entity.country = address.country;

    return entity;
  }
}
