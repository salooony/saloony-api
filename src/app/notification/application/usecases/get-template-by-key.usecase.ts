import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/itemplate.repository';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';
import { TemplateResponseDto } from '../dtos/responses/template.response.dto';

@Injectable()
export class GetTemplateByKeyUseCase {
  constructor(@Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: ITemplateRepository) {}

  async execute(key: string, type: NotificationType): Promise<TemplateResponseDto> {
    const template = await this.templateRepository.findByKey(key, type);

    if (!template) {
      throw new NotFoundException(`Template with key ${key} not found`);
    }

    return TemplateResponseDto.createFromEntity(template);
  }
}
