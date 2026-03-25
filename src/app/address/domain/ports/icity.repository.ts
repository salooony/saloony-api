import { City } from '../entities/city.entity';

export const CITY_REPOSITORY = 'CITY_REPOSITORY';

export interface ICityRepository {
  save(city: City): Promise<City>;
  findByNameAndCountry(name: string, countryId: string): Promise<City | null>;
}
