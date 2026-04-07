import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/template.repository.interface';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';

@Injectable()
export class DeleteTemplateUseCase {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(key: string, type: NotificationType): Promise<void> {
    const template = await this.templateRepository.findByKey(key, type);

    if (!template) {
      throw new NotFoundException(`Template with key ${key} and type ${type} not found`);
    }

    await this.templateRepository.deleteByKey(key, type);
  }
}
