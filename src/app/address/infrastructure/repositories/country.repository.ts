import { ICountryRepository } from '@address/domain/ports/icountry.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country as CountrySchema } from '../schemas/country.schema';
import { Country } from '@address/domain/entities/country.entity';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable()
export class CountryRepository implements ICountryRepository {
  constructor(@InjectRepository(CountrySchema) private readonly repository: Repository<CountrySchema>) {}

  async save(country: Country): Promise<Country> {
    const schema = CountryMapper.toSchema(country);
    const saved = await this.repository.save(schema);
    return CountryMapper.map(saved);
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
