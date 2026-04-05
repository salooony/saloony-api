import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template as SchemaTemplate } from '../schemas/template.schema';
import { Template as DomainTemplate } from '../../domain/entities/template';
import { ITemplateRepository } from '../../domain/ports/template.repository.interface';
import { TemplateMapper } from '../mappers/template.mapper';
import { NotificationType } from '../../domain/enums/notification-type.enum';

@Injectable()
export class TemplateRepository implements ITemplateRepository {
  constructor(
    @InjectRepository(SchemaTemplate)
    private readonly repository: Repository<SchemaTemplate>,
  ) {}

  async findAll(): Promise<DomainTemplate[]> {
    const schemas = await this.repository.find();
    return schemas.map((schema) => TemplateMapper.toDomain(schema)!);
  }

  async findByKey(key: string, type: NotificationType): Promise<DomainTemplate | null> {
    const schema = await this.repository.findOne({ where: { key, type } });
    return TemplateMapper.toDomain(schema);
  }

  async save(domain: DomainTemplate): Promise<DomainTemplate> {
    const schema = TemplateMapper.toSchema(domain);
    const savedSchema = await this.repository.save(schema);
    return TemplateMapper.toDomain(savedSchema)!;
  }

  async deleteByKey(key: string, type: NotificationType): Promise<void> {
    await this.repository.delete({ key, type });
  }
}
