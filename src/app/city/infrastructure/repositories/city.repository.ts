import { ICityRepository } from '@app/city/domain/ports/icity.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City as CityEntity } from '../schemas/city.entity';
import { City } from '@app/city/domain/entities/city';
import { CityMapper } from '../mappers/city.mapper';

@Injectable()
export class CityRepository implements ICityRepository {
  constructor(@InjectRepository(CityEntity) private repository: Repository<CityEntity>) {}

  async findAll(): Promise<City[]> {
    const cities = await this.repository.find();
    return cities.map((city) => CityMapper.map(city));
  }

  async findOneById(id: string): Promise<City | null> {
    const city = await this.repository.findOne({ where: { id } });

    if (!city) return null;

    return CityMapper.map(city);
  }
}
