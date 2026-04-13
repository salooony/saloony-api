import { Template } from '@notification/domain/entities/template';
import { TemplateUpdateProps } from '@notification/domain/types/template-update.props';
import { CreateTemplateRequestDto } from '../dtos/requests/create-template.request.dto';
import { UpdateTemplateRequestDto } from '../dtos/requests/update-template.request.dto';

export class TemplateTransformer {
  public static toEntity(dto: CreateTemplateRequestDto): Template {
    const template = new Template();

    template.key = dto.key;
    template.type = dto.type;
    template.title = dto.title;
    template.message = dto.message;
    template.defaultParameters = dto.defaultParameters || {};

    const now = new Date();
    template.createdAt = now;
    template.updatedAt = now;

    return template;
  }

  public static toUpdateProps(dto: UpdateTemplateRequestDto): TemplateUpdateProps {
    return {
      title: dto.title,
      message: dto.message,
      defaultParameters: dto.defaultParameters,
    };
  }
}
