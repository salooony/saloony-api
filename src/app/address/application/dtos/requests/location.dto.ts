import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationRequestDto {
  @ApiProperty({
    description: 'Latitude coordinate (-90 to 90).',
    example: 32.2211,
    type: Number,
    minimum: -90,
    maximum: 90,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  public latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate (-180 to 180).',
    example: 35.2544,
    type: Number,
    minimum: -180,
    maximum: 180,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  public longitude: number;
}
