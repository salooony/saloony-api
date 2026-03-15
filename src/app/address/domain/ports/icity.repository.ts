import { City } from '../entities/city.entity';
import { Country } from '../entities/country.entity';

export const CITY_REPOSITORY = 'CITY_REPOSITORY';

export interface ICityRepository {
  save(city: City): Promise<City>;

  findCountryById(id: string): Promise<Country | null>;
}
