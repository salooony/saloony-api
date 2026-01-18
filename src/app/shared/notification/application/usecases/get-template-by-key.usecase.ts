import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITemplateRepository } from '../../domain/ports/template.repository.interface';
import { Template } from '../../infrastructure/schemas/template.entity';
import { TemplateKey } from '../../domain/enums/template-type.enum';

@Injectable()
export class GetTemplateByKeyUseCase {
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(key: TemplateKey): Promise<Template> {
    const template = await this.templateRepository.findByKey(key);

    if (!template) {
      throw new NotFoundException(`Template with key ${key} not found`);
    }

    return template;
  }
}
