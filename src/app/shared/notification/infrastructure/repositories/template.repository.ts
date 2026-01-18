import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../schemas/template.entity';
import { ITemplateRepository } from '../../domain/ports/template.repository.interface';
import { TemplateKey } from '../../domain/enums/template-type.enum';

@Injectable()
export class TemplateRepository implements ITemplateRepository {
  constructor(
    @InjectRepository(Template)
    private readonly repository: Repository<Template>,
  ) {}

  async findByKey(key: TemplateKey): Promise<Template | null> {
    return await this.repository.findOne({ where: { key } });
  }

  create(template: Partial<Template>): Template {
    return this.repository.create(template);
  }

  async save(template: Template): Promise<Template> {
    return await this.repository.save(template);
  }

  async findAllActive(): Promise<Template[]> {
    return await this.repository.find({ where: { isActive: true } });
  }

  async update(id: string, updates: Partial<Template>): Promise<Template> {
    await this.repository.update(id, updates);
    const updated = await this.repository.findOne({ where: { id } });
    if (!updated) {
      throw new Error(`Template with id ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
