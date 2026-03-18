import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '@notification/infrastructure/schemas/template.schema';
import { TemplateRepository } from '@notification/infrastructure/repositories/template.repository';
import { CreateTemplateUseCase } from '@notification/application/usecases/create-template.usecase';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';
import { TemplateRendererService } from '@notification/application/services/template-renderer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [
    TemplateRepository,
    {
      provide: 'ITemplateRepository',
      useClass: TemplateRepository,
    },
    CreateTemplateUseCase,
    GetTemplateByKeyUseCase,
    TemplateRendererService,
  ],
  exports: [CreateTemplateUseCase, GetTemplateByKeyUseCase, TemplateRendererService],
})
export class TemplateModule {}
