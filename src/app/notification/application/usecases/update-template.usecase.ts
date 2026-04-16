import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/itemplate.repository';
import { Template } from '@notification/domain/entities/template';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';
import { UpdateTemplateRequestDto } from '@notification/application/dtos/requests/update-template.request.dto';
import { TemplateResponseDto } from '../dtos/responses/template.response.dto';

@Injectable()
export class UpdateTemplateUseCase {
  constructor(@Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: ITemplateRepository) {}

  async execute(key: string, type: NotificationType, dto: UpdateTemplateRequestDto): Promise<TemplateResponseDto> {
    const template = await this.templateRepository.findByKey(key, type);

    if (!template) {
      throw new NotFoundException(`Template with key "${key}" and type "${type}" not found`);
    }

    this.applyUpdate(template, dto);

    const updatedTemplate = await this.templateRepository.save(template);
    return TemplateResponseDto.createFromEntity(updatedTemplate);
  }

  private applyUpdate(template: Template, dto: UpdateTemplateRequestDto): void {
    if (dto.title !== undefined) template.title = dto.title;
    if (dto.message !== undefined) template.message = dto.message;
    if (dto.defaultParameters !== undefined) {
      template.defaultParameters = dto.defaultParameters;
    }
  }
}
