import { Injectable, NotFoundException } from '@nestjs/common';
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
    const templates = await this.repository.find();
    return templates.map((template) => TemplateMapper.toDomain(template)!);
  }

  async findByKey(key: string, type: NotificationType): Promise<DomainTemplate | null> {
    const template = await this.repository.findOne({ where: { key, type } });
    return TemplateMapper.toDomain(template);
  }

  async save(domain: DomainTemplate): Promise<DomainTemplate> {
    const template = TemplateMapper.toSchema(domain);
    const savedTemplate = await this.repository.save(template);
    return TemplateMapper.toDomain(savedTemplate)!;
  }

  async deleteByKey(key: string, type: NotificationType): Promise<void> {
    const result = await this.repository.delete({ key, type });
    if (result.affected === 0) {
      throw new NotFoundException(`Template with key ${key} and type ${type} not found`);
    }
  }
}
