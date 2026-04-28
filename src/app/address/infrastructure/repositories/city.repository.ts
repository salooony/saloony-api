import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { City as CitySchema } from '../schemas/city.schema';
import { City } from '@address/domain/entities/city.entity';
import { ICityRepository } from '@address/domain/ports/icity.repository';
import { CityMapper } from '@address/infrastructure/mappers/city.mapper';
import { CityCriteria } from '@address/domain/criteria/find-city.criteria';

@Injectable()
export class CityRepository implements ICityRepository {
  constructor(@InjectRepository(CitySchema) private readonly repository: Repository<CitySchema>) {}

  async save(city: City): Promise<City> {
    const saved = await this.repository.save(CityMapper.toSchema(city));
    return CityMapper.map(saved);
  }

  async findOne(criteria: CityCriteria): Promise<City | null> {
    const city = await this.repository.findOne({
      where: this.buildWhereClause(criteria),
    });

    if (!city) {
      return null;
    }

    return CityMapper.map(city);
  }

  private buildWhereClause(criteria: CityCriteria): FindOptionsWhere<CitySchema> {
    const where: FindOptionsWhere<CitySchema> = {};

    if (criteria.name) {
      where.name = criteria.name;
    }

    if (criteria.countryId) {
      where.countryId = criteria.countryId;
    }

    return where;
  }
}
