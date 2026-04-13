import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '@notification/infrastructure/schemas/template.schema';
import { TemplateRepository } from '@notification/infrastructure/repositories/template.repository';
import { TEMPLATE_REPOSITORY } from '@notification/domain/ports/itemplate.repository';
import { CreateTemplateUseCase } from '@notification/application/usecases/create-template.usecase';
import { GetAllTemplatesUseCase } from '@notification/application/usecases/get-all-templates.usecase';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';
import { UpdateTemplateUseCase } from '@notification/application/usecases/update-template.usecase';
import { DeleteTemplateUseCase } from '@notification/application/usecases/delete-template.usecase';
import { TemplateRendererService } from '@notification/application/services/template-renderer.service';
import { TemplateController } from '@notification/infrastructure/controllers/template.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [
    TemplateRepository,
    {
      provide: TEMPLATE_REPOSITORY,
      useClass: TemplateRepository,
    },
    CreateTemplateUseCase,
    GetAllTemplatesUseCase,
    GetTemplateByKeyUseCase,
    UpdateTemplateUseCase,
    DeleteTemplateUseCase,
    TemplateRendererService,
  ],
})
export class TemplateModule {}
