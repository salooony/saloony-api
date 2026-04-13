import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@app/notification/domain/ports/itemplate.repository';
import { Template } from '@notification/domain/entities/template';
import { CreateTemplateRequestDto } from '@notification/application/dtos/requests/create-template.request.dto';
import { TemplateTransformer } from '../transformers/template.transformer';

@Injectable()
export class CreateTemplateUseCase {
  constructor(@Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: ITemplateRepository) {}

  async execute(dto: CreateTemplateRequestDto): Promise<Template> {
    const template = TemplateTransformer.toEntity(dto);

    if (await this.templateRepository.findByKey(template.key, template.type)) {
      throw new ConflictException(`Template with key ${template.key} and type ${template.type} already exists`);
    }

    return await this.templateRepository.save(template);
  }
}
