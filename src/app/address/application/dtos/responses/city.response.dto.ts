import { ApiProperty } from '@nestjs/swagger';
import { City } from '@address/domain/entities/city.entity';

export class CityResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
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
