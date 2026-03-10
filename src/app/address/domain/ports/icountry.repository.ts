import { Country } from '../entities/country.entity';

export const COUNTRY_REPOSITORY = 'ICountryRepository';

export interface ICountryRepository {
  save(country: Country): Promise<Country>;
  findOneById(id: string): Promise<Country | null>;
  update(country: Country): Promise<Country>;
}
