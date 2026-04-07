import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City as CitySchema } from '../schemas/city.schema';
import { City } from '@address/domain/entities/city.entity';

import { ICityRepository } from '@address/domain/ports/icity.repository';
import { CityMapper } from '@address/infrastructure/mappers/city.mapper';
import { CityCriteria } from '@address/domain/criteria/find-city.criteria';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class CityRepository implements ICityRepository {
  constructor(@InjectRepository(CitySchema) private readonly repository: Repository<CitySchema>) {}

  async save(city: City): Promise<City> {
    const schema = CityMapper.toSchema(city);

    const saved = await this.repository.save(schema);

    const withRelation = await this.repository.findOne({
      where: { id: saved.id },
      relations: ['country'],
    });

    return CityMapper.map(withRelation!);
  }

  async findOne(criteria: CityCriteria): Promise<City | null> {
    const where: FindOptionsWhere<CitySchema> = {};

    if (criteria.name) {
      where.name = criteria.name;
    }

    if (criteria.countryId) {
      where.country = { id: criteria.countryId };
    }
    const city = await this.repository.findOne({
      where,
      relations: ['country'],
    });

    if (!city) {
      return null;
    }

    return CityMapper.map(city);
  }
}
