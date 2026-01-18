import { Injectable, Inject } from '@nestjs/common';
import { ITemplateRepository } from '../../domain/ports/template.repository.interface';
import { Template } from '../../infrastructure/schemas/template.entity';
import { TemplateType, TemplateKey } from '../../domain/enums/template-type.enum';

@Injectable()
export class CreateTemplateUseCase {
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(
    key: TemplateKey,
    type: TemplateType,
    title: string,
    message: string,
    defaultParameters?: Record<string, any>,
    metadata?: Record<string, any>,
  ): Promise<Template> {
    // Check if template with this key already exists
    const existingTemplate = await this.templateRepository.findByKey(key);
    if (existingTemplate) {
      throw new Error(`Template with key ${key} already exists`);
    }

    const template = this.templateRepository.create({
      key,
      type,
      title,
      message,
      defaultParameters,
      metadata,
      isActive: true,
    });

    return await this.templateRepository.save(template);
  }
}
