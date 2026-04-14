import { City } from '../entities/city.entity';
import { CityCriteria } from '@address/domain/criteria/find-city.criteria';

export const CITY_REPOSITORY = 'CITY_REPOSITORY';

export interface ICityRepository {
  save(city: City): Promise<City>;
  findOne(criteria: CityCriteria): Promise<City | null>;
}
