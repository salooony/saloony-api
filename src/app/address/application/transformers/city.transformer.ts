import { City } from '@address/domain/entities/city.entity';
import { CityResponseDto } from '../dtos/responses/city.response.dto';
import { CreateCityRequestDto } from '../dtos/requests/create-city.request.dto';
import { Country } from '@address/domain/entities/country.entity';

export class CityTransformer {
  static toDomain(dto: CreateCityRequestDto, country: Country): City {
    return new City('', dto.name, country);
  }

  static toResponse(city: City): CityResponseDto {
    return {
      id: city.id,
      name: city.name,
      countryId: city.country.id,
    };
  }
}
