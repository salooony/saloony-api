import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/template.repository.interface';
import { Template } from '@notification/domain/entities/template';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';

@Injectable()
export class GetTemplateByKeyUseCase {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(key: string, type: NotificationType): Promise<Template> {
    const template = await this.templateRepository.findByKey(key, type);

    if (!template) {
      throw new NotFoundException(`Template with key ${key} not found`);
    }

    return template;
  }
}
