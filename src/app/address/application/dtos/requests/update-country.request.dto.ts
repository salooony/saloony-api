import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateCountryRequestDto {
  @ApiProperty({
    description: 'ISO country code (1-3 letters, like TN, PSE).',
    type: String,
    required: true,
    example: 'PSE',
    minLength: 1,
    maxLength: 3,
    pattern: '^[A-Z]{1,3}$',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(3)
  @Matches(/^[A-Z]{1,3}$/)
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
    example: 'ً🇹🇳',
  })
  @IsNotEmpty()
  @IsString()
  public icon: string;

  @ApiPropertyOptional({
    description: 'Whether the country is active.',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  public isActive?: boolean;
}
