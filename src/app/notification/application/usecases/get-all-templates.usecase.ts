import { Injectable, Inject } from '@nestjs/common';
import { ITemplateRepository, TEMPLATE_REPOSITORY } from '@notification/domain/ports/template.repository.interface';
import { Template } from '@notification/domain/entities/template';

@Injectable()
export class GetAllTemplatesUseCase {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(): Promise<Template[]> {
    return await this.templateRepository.findAll();
  }
}
