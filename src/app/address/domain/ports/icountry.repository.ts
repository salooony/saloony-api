import { Country } from '../entities/country.entity';

export type ListCountriesFilters = {
  isActive?: boolean;
  name?: string;
  code?: string;
};

export interface ICountryRepository {
  save(country: Country): Promise<Country>;
  findAll(filters: ListCountriesFilters): Promise<Country[]>;
}
