import { ICountryRepository, ListCountriesFilters } from '@address/domain/ports/icountry.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country as CountrySchema } from '../schemas/country.schema';
import { Country } from '@address/domain/entities/country.entity';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable()
export class CountryRepository implements ICountryRepository {
  constructor(
    @InjectRepository(CountrySchema)
    private readonly repository: Repository<CountrySchema>,
  ) {}

  async save(country: Country): Promise<Country> {
    const schema = CountryMapper.toSchema(country);
    const saved = await this.repository.save(schema);
    return CountryMapper.map(saved);
  }

  async findAll(filters: ListCountriesFilters): Promise<Country[]> {
    const queryBuilder = this.repository.createQueryBuilder('country');

    if (typeof filters.isActive === 'boolean') {
      queryBuilder.andWhere('country.is_active = :isActive', {
        isActive: filters.isActive,
      });
    }

    if (filters.name) {
      queryBuilder.andWhere('country.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.code) {
      queryBuilder.andWhere('country.code = :code', {
        code: filters.code,
      });
    }

    return (await queryBuilder.orderBy('country.name', 'ASC').getMany()).map((schema) => CountryMapper.map(schema));
  }

  async findOneById(id: string): Promise<Country | null> {
    const country = await this.repository.findOne({ where: { id } });

    if (!country) {
      return null;
    }

    return CountryMapper.map(country);
  }

  async update(country: Country): Promise<Country> {
    const countryEntity = CountryMapper.toSchema(country);
    return CountryMapper.map(await this.repository.save(countryEntity));
  }
}
