import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @ApiProperty({ example: 32.2211 })
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({ example: 35.2544 })
  @IsNotEmpty()
  @IsNumber()
  lng: number;
}

export class UpsertAddressRequestDto {
  @ApiProperty({ description: 'Location coordinates' })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  public location: LocationDto;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  public postcode: string;

  @ApiProperty({ example: 'uuid-here' })
  @IsNotEmpty()
  @IsUUID()
  public cityId: string;

  @ApiProperty({ example: 'Main St 12' })
  @IsNotEmpty()
  @IsString()
  public address: string;

  @ApiPropertyOptional({ example: 'Floor 2' })
  @IsOptional()
  @IsString()
  public complement?: string;
}
