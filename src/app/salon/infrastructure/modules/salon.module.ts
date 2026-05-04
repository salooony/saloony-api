import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonController } from '../controllers/salon.controller';
import { SalonRepository } from '../providers/salon.repository';
import { SALON_REPOSITORY } from '@salon/domain/ports/isalon.repository';
import { Salon } from '../schemas/salon.entity';
import { Service } from '../schemas/service.entity';
import { ServiceCategory } from '../schemas/service-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salon, Service, ServiceCategory])],
  controllers: [SalonController],
  providers: [
    SalonRepository,
    {
      provide: SALON_REPOSITORY,
      useClass: SalonRepository,
    },
  ],
  exports: [],
})
export class SalonModule {}
