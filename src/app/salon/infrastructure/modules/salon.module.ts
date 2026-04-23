import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salon } from '../schemas/salon.entity';
import { ServiceEntity } from '../schemas/service.entity';
import { SalonController } from '../controllers/salon.controller';
import { ServiceController } from '../controllers/service.controller';
import { SalonRepository } from '../providers/salon.repository';
import { SALON_REPOSITORY } from '@salon/domain/ports/isalon.repository';

/**
 * SalonModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([Salon, ServiceEntity])],
  controllers: [SalonController, ServiceController],
  providers: [
    SalonRepository,
    {
      provide: SALON_REPOSITORY,
      useClass: SalonRepository,
    },
  ],
  exports: [SALON_REPOSITORY],
})
export class SalonModule {}
