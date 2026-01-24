import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '../schemas/template.scheam';
import { TemplateRepository } from '../repositories/template.repository';
import { CreateTemplateUseCase } from '../../application/usecases/create-template.usecase';
import { GetTemplateByKeyUseCase } from '../../application/usecases/get-template-by-key.usecase';

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
  exports: [CreateTemplateUseCase, GetTemplateByKeyUseCase, 'ITemplateRepository'],
})
export class TemplateModule {}
