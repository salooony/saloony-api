import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ITemplateRepository } from '@notification/domain/ports/template.repository.interface';
import { Template } from '@notification/domain/entities/template';
import { CreateTemplateRequestDto } from '@notification/application/dtos/requests/create-template.request.dto';

@Injectable()
export class CreateTemplateService {
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(dto: CreateTemplateRequestDto): Promise<Template> {
    const { key, type, title, message, defaultParameters, metadata } = dto;

    // Check if template with this key already exists
    const existingTemplate = await this.templateRepository.findByKey(key);
    if (existingTemplate) {
      throw new ConflictException(`Template with key ${key} already exists`);
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
