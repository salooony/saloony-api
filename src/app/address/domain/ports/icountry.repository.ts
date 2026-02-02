import { Country } from '../entities/country.entity';

export interface ICountryRepository {
  save(country: Country): Promise<Country>;
}
