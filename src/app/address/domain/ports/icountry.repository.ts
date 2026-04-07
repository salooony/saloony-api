import { Country } from '../entities/country.entity';

export const COUNTRY_REPOSITORY = 'ICountryRepository';

export type ListCountriesFilters = {
  isActive?: boolean;
  name?: string;
  code?: string;
};

export interface ICountryRepository {
  save(country: Country): Promise<Country>;
  findOneById(id: string): Promise<Country | null>;
  update(country: Country): Promise<Country>;
  findAll(filters: ListCountriesFilters): Promise<Country[]>;
}
