import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '../schemas/template.entity';
import { TemplateRepository } from '../repositories/template.repository';
import { CreateTemplateUseCase } from '../../application/usecases/create-template.usecase';
import { GetTemplateByKeyUseCase } from '../../application/usecases/get-template-by-key.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [
    // Repository implementation
    TemplateRepository,
    // Provide the interface token
    {
      provide: 'ITemplateRepository',
      useClass: TemplateRepository,
    },
    // Use cases
    CreateTemplateUseCase,
    GetTemplateByKeyUseCase,
  ],
  exports: [CreateTemplateUseCase, GetTemplateByKeyUseCase, 'ITemplateRepository'],
})
export class TemplateModule {}
