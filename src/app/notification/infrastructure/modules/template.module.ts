import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '@notification/infrastructure/schemas/template.schema';
import { TemplateRepository } from '@notification/infrastructure/repositories/template.repository';
import { CreateTemplateService } from '@app/notification/application/services/create-template.service';
import { GetTemplateByKeyService } from '@app/notification/application/services/get-template-by-key.service';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [
    TemplateRepository,
    {
      provide: 'ITemplateRepository',
      useClass: TemplateRepository,
    },
    CreateTemplateService,
    GetTemplateByKeyService,
  ],
  exports: [CreateTemplateService, GetTemplateByKeyService],
})
export class TemplateModule {}
