import { ApiProperty } from '@nestjs/swagger';

export class LocationResponseDto {
  @ApiProperty({ example: 32.2211, type: Number })
  lat: number;

  @ApiProperty({ example: 35.2544, type: Number })
  lng: number;
}
