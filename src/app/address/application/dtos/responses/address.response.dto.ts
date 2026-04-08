import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Address } from '@address/domain/entities/address.entity';

class LocationResponseDto {
  @ApiProperty({ example: 32.2211, type: Number })
  lat: number;

  @ApiProperty({ example: 32.2211, type: Number })
  lng: number;
}

export class AddressResponseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty({ type: LocationResponseDto })
  public location: LocationResponseDto;

  @ApiProperty({ example: '1234' })
  public postcode: string;

  @ApiProperty({ example: 'uuid-here' })
  public cityId: string;

  @ApiProperty({ example: 'Main St 12' })
  public address: string;

  @ApiPropertyOptional({ example: 'Floor 2' })
  public complement?: string;

  static createFromEntity(address: Address): AddressResponseDto {
    const dto = new AddressResponseDto();
    dto.id = address.id;
    dto.location = {
      lat: address.location.lat,
      lng: address.location.lng,
    };
    dto.postcode = address.postcode;
    dto.cityId = address.cityId;
    dto.address = address.address;
    dto.complement = address.complement;
    return dto;
  }
}
