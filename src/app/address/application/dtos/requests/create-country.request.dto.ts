import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  COUNTRY_CODE_EXAMPLE,
  COUNTRY_CODE_LENGTH,
  COUNTRY_CODE_PATTERN,
  COUNTRY_CODE_REGEX,
} from '@address/domain/constants/country-code.constants';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateCountryRequestDto {
  @ApiProperty({
    description: 'ISO 3166-1 alpha-3 country code (like TUN, PSE).',
    type: String,
    required: true,
    example: COUNTRY_CODE_EXAMPLE,
    minLength: COUNTRY_CODE_LENGTH,
    maxLength: COUNTRY_CODE_LENGTH,
    pattern: COUNTRY_CODE_PATTERN,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(COUNTRY_CODE_LENGTH)
  @MaxLength(COUNTRY_CODE_LENGTH)
  @Matches(COUNTRY_CODE_REGEX)
  public code: string;

  @ApiProperty({
    description: 'Country name.',
    type: String,
    required: true,
    example: 'Tunisia',
  })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Country flag icon (like emoji).',
    type: String,
    example: '🇹🇳',
  })
  @IsNotEmpty()
  @IsString()
  public icon: string;

  @ApiPropertyOptional({
    description: 'Whether the country is active.',
    type: Boolean,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  public isActive?: boolean;
}
