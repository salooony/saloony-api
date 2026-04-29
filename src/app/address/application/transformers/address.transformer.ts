import { Address } from '@address/domain/entities/address.entity';
import { AddressRequestDto } from '../dtos/requests/address.request.dto';

export class AddressTransformer {
  static toDomain(dto: AddressRequestDto, id: string = ''): Address {
    return new Address(id, dto.location, dto.postcode, dto.cityId, dto.address, dto.complement);
  }
}
