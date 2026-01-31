import { ApiProperty } from '@nestjs/swagger';
import { Country } from '@address/domain/entities/country.entity';

export class CountryResponseDto {
  @ApiProperty({
    description: 'The country id.',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  public id: string;

  @ApiProperty({
    description: 'ISO country code.',
    type: String,
    example: 'TN',
  })
  public code: string;

  @ApiProperty({
    description: 'Country flag icon.',
    type: String,
    example: '🇹🇳',
  })
  public icon: string;

  @ApiProperty({
    description: 'Country name.',
    type: String,
    example: 'Tunisia',
  })
  public name: string;

  @ApiProperty({
    description: 'Whether the country is active.',
    type: Boolean,
    example: true,
  })
  public isActive: boolean;

  private constructor() {}

  public static createFromEntity(country: Country): CountryResponseDto {
    const dto = new CountryResponseDto();
    dto.id = country.id;
    dto.code = country.code;
    dto.icon = country.icon;
    dto.name = country.name;
    dto.isActive = country.isActive;
    return dto;
  }
}
