import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategory as ServiceCategorySchema } from '@salon/infrastructure/schemas/service-category.entity';
import { ServiceCategory } from '@salon/domain/entities/service-category';
import { IServiceCategoryRepository } from '@salon/domain/ports/iservice-category.repository';
import { ServiceCategoryMapper } from '@salon/infrastructure/mappers/service-category.mapper';

/** TypeORM-backed implementation of service category persistence. */
@Injectable()
export class ServiceCategoryRepository implements IServiceCategoryRepository {
  constructor(
    @InjectRepository(ServiceCategorySchema)
    private readonly repository: Repository<ServiceCategorySchema>,
  ) {}

  async create(category: ServiceCategory): Promise<ServiceCategory> {
    const schema = ServiceCategoryMapper.toSchema(category);
    const saved = await this.repository.save(schema);
    return ServiceCategoryMapper.toDomain(saved);
  }
}
