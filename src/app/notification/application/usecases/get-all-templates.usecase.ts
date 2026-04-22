import { Injectable, Inject } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/itemplate.repository';
import { TemplateResponseDto } from '../dtos/responses/template.response.dto';

@Injectable()
export class GetAllTemplatesUseCase {
  constructor(@Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: ITemplateRepository) {}

  async execute(): Promise<TemplateResponseDto[]> {
    const templates = await this.templateRepository.findAll();
    return templates.map((template) => TemplateResponseDto.createFromEntity(template));
  }
}
