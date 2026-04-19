import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salon as SalonSchema } from '../schemas/salon.entity';
import { Salon } from '../../domain/entities/salon';
import { ISalonRepository } from '../../domain/ports/isalon.repository';
import { SalonMapper } from '../mappers/salon.mapper';

/**
 * SalonRepository
 */
@Injectable()
export class SalonRepository implements ISalonRepository {
  constructor(
    @InjectRepository(SalonSchema)
    private readonly repository: Repository<SalonSchema>,
  ) {}

  async save(salon: Salon): Promise<Salon> {
    const savedSchema = await this.repository.save(SalonMapper.toSchema(salon));
    return SalonMapper.map(savedSchema)!;
  }

  async findAll(): Promise<Salon[]> {
    const schemas = await this.repository.find();
    return schemas.map((schema) => SalonMapper.map(schema)!);
  }

  async findById(id: string): Promise<Salon | null> {
    const schema = await this.repository.findOneBy({ id });
    return SalonMapper.map(schema);
  }
}
