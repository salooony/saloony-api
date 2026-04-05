import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { ITemplateRepository } from '@notification/domain/ports/template.repository.interface';
import { Template } from '@notification/domain/entities/template';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';
import { UpdateTemplateRequestDto } from '@notification/application/dtos/requests/update-template.request.dto';

@Injectable()
export class UpdateTemplateUseCase {
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async execute(key: string, type: NotificationType, dto: UpdateTemplateRequestDto): Promise<Template> {
    const template = await this.templateRepository.findByKey(key, type);

    if (!template) {
      throw new NotFoundException(`Template with key ${key} and type ${type} not found`);
    }

    const { key: newKeyParam, type: newTypeParam, title, message, defaultParameters } = dto;

    const id = template.id;
    // Validate unique (key, type) if they are changing
    const finalKey = newKeyParam ?? template.key;
    const finalType = newTypeParam ?? template.type;

    if (newKeyParam || newTypeParam) {
      const existing = await this.templateRepository.findByKey(finalKey, finalType);
      if (existing && existing.id !== id) {
        throw new ConflictException(`Template with key ${finalKey} and type ${finalType} already exists`);
      }
    }

    if (newKeyParam) template.key = newKeyParam;
    if (newTypeParam) template.type = newTypeParam;
    if (title) template.title = title;
    if (message) template.message = message;
    if (defaultParameters) template.defaultParameters = defaultParameters;

    return await this.templateRepository.save(template);
  }
}
