import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City as CitySchema } from '../schemas/city.schema';
import { City } from '@address/domain/entities/city.entity';

import { ICityRepository } from '@address/domain/ports/icity.repository';
import { CityMapper } from '@address/infrastructure/mappers/city.mapper';

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

  async findByNameAndCountry(name: string, countryId: string): Promise<City | null> {
    const found = await this.repository.findOne({
      where: {
        name,
        country: {
          id: countryId,
        },
      },
      relations: ['country'],
    });

    if (!found) {
      return null;
    }

    return CityMapper.map(found);
  }
}
