import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LocationDto {
  @ApiProperty({ example: 32.2211 })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: 35.2544 })
  @IsNumber()
  lng: number;
}
