import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '@notification/infrastructure/schemas/template.schema';
import { TemplateRepository } from '@notification/infrastructure/repositories/template.repository';
import { CreateTemplateUseCase } from '@notification/application/usecases/create-template.usecase';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';

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
  ],
  exports: [CreateTemplateUseCase, GetTemplateByKeyUseCase],
})
export class TemplateModule {}
