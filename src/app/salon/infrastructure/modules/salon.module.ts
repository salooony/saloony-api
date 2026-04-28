import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonController } from '../controllers/salon.controller';
import { ServiceController } from '../controllers/service.controller';
import { SalonRepository } from '../providers/salon.repository';
import { ServiceRepository } from '../providers/service.repository';
import { SALON_REPOSITORY } from '@salon/domain/ports/isalon.repository';
import { SERVICE_REPOSITORY } from '@salon/domain/ports/iservice.repository';
import { SalonSchema, ServiceSchema, ServiceCategorySchema, SalonServiceSchema } from '@salon';

@Module({
  imports: [TypeOrmModule.forFeature([SalonSchema, ServiceSchema, ServiceCategorySchema, SalonServiceSchema])],
  controllers: [SalonController, ServiceController],
  providers: [
    SalonRepository,
    ServiceRepository,
    {
      provide: SALON_REPOSITORY,
      useClass: SalonRepository,
    },
    {
      provide: SERVICE_REPOSITORY,
      useClass: ServiceRepository,
    },
  ],
  exports: [SALON_REPOSITORY, SERVICE_REPOSITORY],
})
export class SalonModule {}
