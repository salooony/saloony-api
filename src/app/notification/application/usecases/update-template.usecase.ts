import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/itemplate.repository';
import { Template } from '@notification/domain/entities/template';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';
import { UpdateTemplateRequestDto } from '@notification/application/dtos/requests/update-template.request.dto';
import { TemplateTransformer } from '../transformers/template.transformer';
import { TemplateResponseDto } from '../dtos/responses/template.response.dto';
import { TemplateUpdateProps } from '@notification/domain/types/template-update.props';

@Injectable()
export class UpdateTemplateUseCase {
  constructor(@Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: ITemplateRepository) {}

  async execute(key: string, type: NotificationType, dto: UpdateTemplateRequestDto): Promise<TemplateResponseDto> {
    const template = await this.templateRepository.findByKey(key, type);

    if (!template) {
      throw new NotFoundException(`Template with key "${key}" and type "${type}" not found`);
    }

    const updateProps = TemplateTransformer.toUpdateProps(dto);
    this.applyUpdate(template, updateProps);

    const updatedTemplate = await this.templateRepository.save(template);
    return TemplateResponseDto.createFromEntity(updatedTemplate);
  }

  private applyUpdate(template: Template, props: TemplateUpdateProps): void {
    if (props.title !== undefined) template.title = props.title;
    if (props.message !== undefined) template.message = props.message;
    if (props.defaultParameters !== undefined) {
      template.defaultParameters = props.defaultParameters;
    }
    template.updatedAt = new Date();
  }
}
