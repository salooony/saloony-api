// Repository implementation to be added later
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City as CitySchema } from '../schemas/city.schema';
import { Country as CountrySchema } from '../schemas/country.schema';

import { City } from '@address/domain/entities/city.entity';

import { ICityRepository } from '@address/domain/ports/icity.repository';
import { CityMapper } from '../mappers/city.mapper';

@Injectable()
export class CityRepository implements ICityRepository {
  constructor(
    @InjectRepository(CitySchema)
    private readonly repository: Repository<CitySchema>,

    @InjectRepository(CountrySchema)
    private readonly countryRepository: Repository<CountrySchema>,
  ) {}

  async save(city: City): Promise<City> {
    const schema = CityMapper.toSchema(city);

    const saved = await this.repository.save(schema);

    const withRelation = await this.repository.findOne({
      where: { id: saved.id },
      relations: ['country'],
    });

    return CityMapper.map(withRelation!);
  }

  async findCountryById(id: string) {
    return this.countryRepository.findOne({
      where: { id },
    });
  }
}
