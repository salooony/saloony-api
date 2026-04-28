import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceSchema, ServiceMapper } from '@salon';
import { Service as ServiceDomain } from '@salon/domain/entities/service';
import { IServiceRepository } from '@salon/domain/ports/iservice.repository';

@Injectable()
export class ServiceRepository implements IServiceRepository {
  readonly type = 'ServiceRepository';

  constructor(
    @InjectRepository(ServiceSchema)
    private readonly repository: Repository<ServiceSchema>,
  ) {}

  /** Persists a service to the database. */
  async save(domain: ServiceDomain): Promise<ServiceDomain> {
    const persistence = ServiceMapper.toPersistence(domain);
    const saved = await this.repository.save(persistence);
    return ServiceMapper.toDomain(saved);
  }

  /** Finds a service by its unique identifier. */
  async findById(id: string): Promise<ServiceDomain | null> {
    const found = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });
    return found ? ServiceMapper.toDomain(found) : null;
  }

  /** Finds all active services. */
  async findAllActive(): Promise<ServiceDomain[]> {
    const found = await this.repository.find({
      where: { active: true },
      relations: ['category'],
    });
    return found.map((s) => ServiceMapper.toDomain(s));
  }
}
