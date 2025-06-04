import { Location } from '@domain/entities/location.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LocationResponseDto {
  @ApiProperty({
    description: 'Latitude of the location',
    required: true,
    type: Number,
    example: 50,
  })
  public latitude: number;

  @ApiProperty({
    description: 'Latitude of the location',
    required: true,
    type: Number,
    example: 50,
  })
  public longitude: number;

  private constructor() {}

  static createFromEntity(location: Location) {
    const locationResponse = new LocationResponseDto();

    locationResponse.latitude = location.latitude;
    locationResponse.longitude = location.longitude;

    return locationResponse;
  }
}
