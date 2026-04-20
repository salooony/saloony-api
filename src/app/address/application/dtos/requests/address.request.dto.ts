import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, ValidateNested, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';

export class AddressRequestDto {
  @ApiProperty({
    description: 'Geographical location coordinates',
    type: () => LocationDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;

  @ApiProperty({
    description: 'Postal code',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  public postcode: string;

  @ApiProperty({
    description: 'City ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  public cityId: string;

  @ApiProperty({
    description: 'Street address',
    example: 'Main St 12',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public address: string;

  @ApiPropertyOptional({
    description: 'Additional details',
    example: 'Floor 2',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public complement?: string;
}
