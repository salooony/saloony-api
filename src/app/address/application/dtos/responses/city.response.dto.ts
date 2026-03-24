import { ApiProperty } from '@nestjs/swagger';
import { City } from '@address/domain/entities/city.entity';

export class CityResponseDto {
  @ApiProperty({
    description: 'City id',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'City name',
    example: 'Gaza',
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Parent country id',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    type: String,
    required: true,
  })
  countryId: string;

  private constructor() {}

  static createFromEntity(city: City): CityResponseDto {
    const dto = new CityResponseDto();

    dto.id = city.id;
    dto.name = city.name;
    dto.countryId = city.country.id;

    return dto;
  }
}
