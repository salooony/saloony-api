import { Address } from '@address/domain/entities/address.entity';
import { AddressResponseDto } from '../dtos/responses/address.response.dto';
import { LocationResponseDto } from '../dtos/responses/location.response.dto';

export class AddressTransformer {
  static toResponse(address: Address): AddressResponseDto {
    const dto = new AddressResponseDto();
    dto.id = address.id;

    const location = new LocationResponseDto();
    location.lat = address.location.lat;
    location.lng = address.location.lng;
    dto.location = location;

    dto.postcode = address.postcode;
    dto.cityId = address.cityId;
    dto.address = address.address;
    dto.complement = address.complement;

    return dto;
  }
}
