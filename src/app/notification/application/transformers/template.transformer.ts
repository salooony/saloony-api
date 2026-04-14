import { Template } from '@notification/domain/entities/template';
import { CreateTemplateRequestDto } from '../dtos/requests/create-template.request.dto';

export class TemplateTransformer {
  public static toEntity(dto: CreateTemplateRequestDto): Template {
    const template = new Template();

    template.key = dto.key;
    template.type = dto.type;
    template.title = dto.title;
    template.message = dto.message;
    template.defaultParameters = dto.defaultParameters || {};

    return template;
  }
}
