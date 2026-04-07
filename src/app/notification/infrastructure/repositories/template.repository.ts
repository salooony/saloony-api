import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template as TemplateSchema } from '../schemas/template.schema';
import { Template } from '../../domain/entities/template';
import { ITemplateRepository } from '../../domain/ports/template.repository.interface';
import { TemplateMapper } from '../mappers/template.mapper';
import { NotificationType } from '../../domain/enums/notification-type.enum';

@Injectable()
export class TemplateRepository implements ITemplateRepository {
  constructor(
    @InjectRepository(TemplateSchema)
    private readonly repository: Repository<TemplateSchema>,
  ) {}

  async findAll(): Promise<Template[]> {
    const templates = await this.repository.find();
    return templates.map((template) => TemplateMapper.toDomain(template)!);
  }

  async findByKey(key: string, type: NotificationType): Promise<Template | null> {
    const template = await this.repository.findOne({ where: { key, type } });

    if (!template) {
      return null;
    }
    return TemplateMapper.toDomain(template);
  }

  async save(template: Template): Promise<Template> {
    return TemplateMapper.toDomain(await this.repository.save(TemplateMapper.toSchema(template)))!;
  }

  async deleteByKey(key: string, type: NotificationType): Promise<void> {
    const result = await this.repository.delete({ key, type });

    if (result.affected === 0) {
      throw new NotFoundException(`Template with key ${key} and type ${type} not found`);
    }
  }
}
