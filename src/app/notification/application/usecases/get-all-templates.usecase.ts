import { Injectable, Inject } from '@nestjs/common';
import { ITemplateRepository } from '@notification/domain/ports/template.repository.interface';
import { Template } from '@notification/domain/entities/template';

@Injectable()
export class GetAllTemplatesUseCase {
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(): Promise<Template[]> {
    return await this.templateRepository.findAll();
  }
}
