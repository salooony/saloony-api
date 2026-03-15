export const CITY_REPOSITORY = 'CITY_REPOSITORY';

import { City } from '../entities/city.entity';

export interface ICityRepository {
  save(city: City): Promise<City>;

  findCountryById(id: string): Promise<any>;
}