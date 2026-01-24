import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template as SchemaTemplate } from '../schemas/template.scheam';
import { Template as DomainTemplate } from '../../domain/entities/template';
import { ITemplateRepository } from '../../domain/ports/template.repository.interface';
import { TemplateMapper } from '../mappers/template.mapper';

@Injectable()
export class TemplateRepository implements ITemplateRepository {
  constructor(
    @InjectRepository(SchemaTemplate)
    private readonly repository: Repository<SchemaTemplate>,
  ) {}

  async findByKey(key: string): Promise<DomainTemplate | null> {
    const schema = await this.repository.findOne({ where: { key } });
    return TemplateMapper.toDomain(schema);
  }

  async save(domain: DomainTemplate): Promise<DomainTemplate> {
    const schema = TemplateMapper.toSchema(domain);
    const savedSchema = await this.repository.save(schema);
    return TemplateMapper.toDomain(savedSchema)!;
  }

  async findAllActive(): Promise<DomainTemplate[]> {
    const schemas = await this.repository.find({ where: { isActive: true } });
    return schemas.map((schema) => TemplateMapper.toDomain(schema)!).filter(Boolean);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
