import { LocationResponseDto } from '@application/location/dtos/response/location.response.dto';
import { Shop } from '@domain/entities/shop.entity';

export class ShopsResponseDto {
  id: string;
  name: string;
  location: LocationResponseDto;
  joinDate: Date;
  description: string;
  // workingTime: Object<DayEnum: TimeRange>
  // employees: Array<Employee>
  // reservations: Array<Reservation>
  // services: Array<Service>
  // shopCalendar: Calendar

  private constructor() {}

  static createFromEntity(shop: Shop): ShopsResponseDto {
    const shopResponse = new ShopsResponseDto();

    shopResponse.id = shop.id;
    shopResponse.name = shop.name;
    shopResponse.location = LocationResponseDto.createFromEntity(shop.location);
    shopResponse.joinDate = shop.joinDate;
    shopResponse.description = shop.description;

    return shopResponse;
  }
}
