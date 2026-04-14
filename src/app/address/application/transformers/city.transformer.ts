import { City } from '@address/domain/entities/city.entity';
import { CityResponseDto } from '../dtos/responses/city.response.dto';
export class CityTransformer {
  static toResponse(city: City): CityResponseDto {
    return {
      id: city.id,
      name: city.name,
      countryId: city.country.id,
    };
  }
}
