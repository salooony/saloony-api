import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { booleanTransform } from '@app/shared/application/transformers/boolean.transform';
import {
  COUNTRY_CODE_EXAMPLE,
  COUNTRY_CODE_LENGTH,
  COUNTRY_CODE_PATTERN,
  COUNTRY_CODE_REGEX,
} from '@address/domain/constants/country-code.constants';
import { IsBoolean, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ListCountriesRequestDto {
  @ApiPropertyOptional({
    description: 'Filter by active status.',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @Transform(booleanTransform)
  @IsBoolean()
  public isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by country name (partial match).',
    type: String,
    example: 'tun',
  })
  @IsOptional()
  @IsString()
  public name?: string;

  @ApiPropertyOptional({
    description: 'Filter by ISO 3166-1 alpha-3 country code (exact match).',
    type: String,
    minLength: COUNTRY_CODE_LENGTH,
    maxLength: COUNTRY_CODE_LENGTH,
    pattern: COUNTRY_CODE_PATTERN,
    example: COUNTRY_CODE_EXAMPLE,
  })
  @IsOptional()
  @IsString()
  @MinLength(COUNTRY_CODE_LENGTH)
  @MaxLength(COUNTRY_CODE_LENGTH)
  @Matches(COUNTRY_CODE_REGEX)
  public code?: string;
}
