import { Address } from '@address/domain/entities/address.entity';
import { AddressResponseDto } from '../dtos/responses/address.response.dto';
import { LocationResponseDto } from '../dtos/responses/location.response.dto';
import { AddressRequestDto } from '../dtos/requests/address.request.dto';

export class AddressTransformer {
  static toDomain(dto: AddressRequestDto, id: string = ''): Address {
    return new Address(id, dto.location, dto.postcode, dto.cityId, dto.address, dto.complement);
  }
  static toResponse(address: Address): AddressResponseDto {
    const dto = new AddressResponseDto();
    dto.id = address.id;

    const location = new LocationResponseDto();
    location.latitude = address.location.latitude;
    location.longitude = address.location.longitude;
    dto.location = location;

    dto.postcode = address.postcode;
    dto.cityId = address.cityId;
    dto.address = address.address;
    dto.complement = address.complement;

    return dto;
  }
}
