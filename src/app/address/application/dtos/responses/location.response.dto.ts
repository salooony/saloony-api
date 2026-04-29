import { ApiProperty } from '@nestjs/swagger';

export class LocationResponseDto {
  @ApiProperty({
    description: 'Latitude coordinate (-90 to 90).',
    example: 32.2211,
    type: Number,
    minimum: -90,
    maximum: 90,
    readOnly: true,
  })
  public latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate (-180 to 180).',
    example: 35.2544,
    type: Number,
    minimum: -180,
    maximum: 180,
    readOnly: true,
  })
  public longitude: number;
}
