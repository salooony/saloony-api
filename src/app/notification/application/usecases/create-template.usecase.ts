import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/template.repository.interface';
import { Template } from '@notification/domain/entities/template';
import { CreateTemplateRequestDto } from '@notification/application/dtos/requests/create-template.request.dto';
import { TemplateTransformer } from '../transformers/template.transformer';

@Injectable()
export class CreateTemplateUseCase {
  constructor(@Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: ITemplateRepository) {}

  async execute(dto: CreateTemplateRequestDto): Promise<Template> {
    const { key, type } = dto;

    // Check if template with this key and type already exists
    const existingTemplate = await this.templateRepository.findByKey(key, type);
    if (existingTemplate) {
      throw new ConflictException(`Template with key ${key} and type ${type} already exists`);
    }

    const template = TemplateTransformer.toEntity(dto);

    return await this.templateRepository.save(template);
  }
}
