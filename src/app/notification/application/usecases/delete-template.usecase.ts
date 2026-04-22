import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/itemplate.repository';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';

@Injectable()
export class DeleteTemplateUseCase {
  constructor(@Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: ITemplateRepository) {}

  async execute(key: string, type: NotificationType): Promise<void> {
    try {
      await this.templateRepository.deleteByKey(key, type);
    } catch {
      throw new NotFoundException(`Template with key ${key} and type ${type} not found`);
    }
  }
}
