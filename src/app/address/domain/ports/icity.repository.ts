import { City } from '../entities/city.entity';
import { FindOptionsWhere } from 'typeorm';
import { City as CitySchema } from '@address/infrastructure/schemas/city.schema';

export const CITY_REPOSITORY = 'CITY_REPOSITORY';

export interface ICityRepository {
  save(city: City): Promise<City>;
  findOne(criteria: FindOptionsWhere<CitySchema>): Promise<City | null>;
}

