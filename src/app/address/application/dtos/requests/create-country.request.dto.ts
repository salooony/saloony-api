import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCountryRequestDto {
  @ApiProperty({
    description: 'ISO country code (like TN, PS).',
    type: String,
    required: true,
    example: 'TN',
    maxLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
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

  @ApiPropertyOptional({
    description: 'Country flag icon (like emoji).',
    type: String,
    example: '🇹🇳',
  })
  @IsOptional()
  @IsString()
  public icon?: string;

  @ApiPropertyOptional({
    description: 'Whether the country is active.',
    type: Boolean,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  public isActive?: boolean;
}
