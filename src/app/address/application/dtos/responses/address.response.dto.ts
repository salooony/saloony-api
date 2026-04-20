import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LocationResponseDto } from './location.response.dto';
import { Address } from '@app/address/domain/entities/address.entity';

export class AddressResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the address.',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
  })
  public id: string;

  @ApiProperty({
    description: 'Geographical location coordinates (latitude & longitude).',
    type: () => LocationResponseDto,
  })
  public location: LocationResponseDto;

  @ApiProperty({
    description: 'Postal code of the address.',
    example: '1234',
    type: String,
  })
  public postcode: string;

  @ApiProperty({
    description: 'Unique identifier of the city (UUID).',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
  })
  public cityId: string;

  @ApiProperty({
    description: 'Street address (e.g., building number and street name).',
    example: 'Main St 12',
    type: String,
  })
  public address: string;

  @ApiPropertyOptional({
    description: 'Additional address details (e.g., apartment, floor).',
    example: 'Floor 2',
    type: String,
  })
  public complement?: string;

  public static createFromEntity(entity: Address): AddressResponseDto {
    const dto = new AddressResponseDto();

    dto.id = entity.id;
    dto.postcode = entity.postcode;
    dto.cityId = entity.cityId;
    dto.address = entity.address;
    dto.complement = entity.complement;

    dto.location = {
      latitude: entity.location.latitude,
      longitude: entity.location.longitude,
    };

    return dto;
  }
}
