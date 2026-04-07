import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ListCountriesRequestDto {
  @ApiPropertyOptional({
    description: 'Filter by active status.',
    type: Boolean,
    example: true,
  })
  @IsOptional()
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
    description: 'Filter by ISO country code (exact match).',
    type: String,
    minLength: 1,
    maxLength: 3,
    pattern: '^[A-Z]{1,3}$',
    example: 'TN',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(3)
  @Matches(/^[A-Z]{1,3}$/)
  public code?: string;
}
