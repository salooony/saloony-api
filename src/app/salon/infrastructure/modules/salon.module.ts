import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonController } from '../controllers/salon.controller';
import { ServiceController } from '../controllers/service.controller';
import { ServiceCategoryController } from '../controllers/service-category.controller';
import { SalonRepository } from '../providers/salon.repository';
import { ServiceCategoryRepository } from '../providers/service-category.repository';
import { SALON_REPOSITORY } from '@salon/domain/ports/isalon.repository';
import { SERVICE_CATEGORY_REPOSITORY } from '@salon/domain/ports/iservice-category.repository';
import { Salon } from '../schemas/salon.entity';
import { Service } from '../schemas/service.entity';
import { ServiceCategory } from '../schemas/service-category.entity';
import { CreateServiceCategoryUseCase } from '@salon/application/create-service-category.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Salon, Service, ServiceCategory])],
  controllers: [SalonController, ServiceController, ServiceCategoryController],
  providers: [
    // Repositories
    SalonRepository,
    { provide: SALON_REPOSITORY, useClass: SalonRepository },
    ServiceCategoryRepository,
    { provide: SERVICE_CATEGORY_REPOSITORY, useClass: ServiceCategoryRepository },

    // Use Cases
    CreateServiceCategoryUseCase,
  ],
  exports: [],
})
export class SalonModule {}
