import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template as TemplateSchema } from '../schemas/template.schema';
import { Template } from '../../domain/entities/template';
import { ITemplateRepository } from '../../domain/ports/itemplate.repository';
import { TemplateMapper } from '../mappers/template.mapper';
import { NotificationType } from '../../domain/enums/notification-type.enum';

@Injectable()
export class TemplateRepository implements ITemplateRepository {
  constructor(@InjectRepository(TemplateSchema) private readonly repository: Repository<TemplateSchema>) {}

  async save(template: Template): Promise<Template> {
    return TemplateMapper.map(await this.repository.save(TemplateMapper.toSchema(template)))!;
  }

  async findAll(): Promise<Template[]> {
    return (await this.repository.find()).map((template) => TemplateMapper.map(template)!);
  }

  async findByKey(key: string, type: NotificationType): Promise<Template | null> {
    const template = await this.repository.findOne({ where: { key, type } });

    if (!template) {
      return null;
    }

    return TemplateMapper.map(template);
  }

  async deleteByKey(key: string, type: NotificationType): Promise<void> {
    const result = await this.repository.delete({ key, type });

    if (result.affected === 0) {
      throw new Error('Template not found');
    }
  }
}
