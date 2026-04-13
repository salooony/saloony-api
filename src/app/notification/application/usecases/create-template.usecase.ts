import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/itemplate.repository';
import { CreateTemplateRequestDto } from '@notification/application/dtos/requests/create-template.request.dto';
import { TemplateTransformer } from '../transformers/template.transformer';
import { TemplateResponseDto } from '../dtos/responses/template.response.dto';

@Injectable()
export class CreateTemplateUseCase {
  constructor(@Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: ITemplateRepository) {}

  async execute(dto: CreateTemplateRequestDto): Promise<TemplateResponseDto> {
    const template = TemplateTransformer.toEntity(dto);

    if (await this.templateRepository.findByKey(template.key, template.type)) {
      throw new ConflictException(`Template with key ${template.key} and type ${template.type} already exists`);
    }

    return TemplateResponseDto.createFromEntity(await this.templateRepository.save(template));
  }
}
