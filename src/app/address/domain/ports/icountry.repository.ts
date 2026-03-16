import { Country } from '../entities/country.entity';

export type ListCountriesFilters = {
  isActive?: boolean;
  name?: string;
  code?: string;
};

export const COUNTRY_REPOSITORY = 'ICountryRepository';

export interface ICountryRepository {
  save(country: Country): Promise<Country>;
  findAll(filters: ListCountriesFilters): Promise<Country[]>;
  findOneById(id: string): Promise<Country | null>;
  update(country: Country): Promise<Country>;
}
