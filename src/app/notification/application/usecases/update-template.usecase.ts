import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/template.repository.interface';
import { Template } from '@notification/domain/entities/template';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';
import { UpdateTemplateRequestDto } from '@notification/application/dtos/requests/update-template.request.dto';

@Injectable()
export class UpdateTemplateUseCase {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(key: string, type: NotificationType, dto: UpdateTemplateRequestDto): Promise<Template> {
    const template = await this.templateRepository.findByKey(key, type);

    if (!template) {
      throw new NotFoundException(`Template with key "${key}" and type "${type}" not found`);
    }

    if (dto.title !== undefined || dto.message !== undefined) {
      template.updateContent(dto.title, dto.message);
    }

    if (dto.type !== undefined) {
      template.updateType(dto.type);
    }

    if (dto.key !== undefined) {
      template.updateKey(dto.key);
    }

    if (dto.defaultParameters !== undefined) {
      template.updateParameters(dto.defaultParameters);
    }

    return await this.templateRepository.save(template);
  }
}
