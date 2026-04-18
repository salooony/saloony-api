import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';

export class UpsertAddressRequestDto {
  @ApiProperty({ description: 'Location coordinates' })
  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;

  @ApiProperty({ example: '1234' })
  @IsString()
  public postcode: string;

  @ApiProperty({ example: 'uuid-here' })
  @IsUUID()
  public cityId: string;

  @ApiProperty({ example: 'Main St 12' })
  @IsString()
  public address: string;

  @ApiPropertyOptional({ example: 'Floor 2' })
  @IsOptional()
  @IsString()
  public complement?: string;
}
