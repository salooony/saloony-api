import { Injectable, Inject } from '@nestjs/common';
import { ITemplateRepository } from '../../domain/ports/template.repository.interface';
import { Template } from '../../domain/entities/template';
import { CreateTemplateRequestDto } from '../dtos/requests/create-template.request.dto';

@Injectable()
export class CreateTemplateUseCase {
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(dto: CreateTemplateRequestDto): Promise<Template> {
    const { key, type, title, message, defaultParameters, metadata } = dto;

    // Check if template with this key already exists
    const existingTemplate = await this.templateRepository.findByKey(key);
    if (existingTemplate) {
      throw new Error(`Template with key ${key} already exists`);
    }

    const template = new Template();
    template.key = key;
    template.type = type;
    template.title = title;
    template.message = message;
    template.defaultParameters = defaultParameters || {};
    template.metadata = metadata || {};
    template.isActive = true;

    return await this.templateRepository.save(template);
  }
}
