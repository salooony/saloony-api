import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salon } from '../schemas/salon.entity';
import { SalonController } from '../controllers/salon.controller';
import { SalonRepository } from '../providers/salon.repository';
import { SALON_REPOSITORY } from '@salon/domain/ports/isalon.repository';

/**
 * SalonModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([Salon])],
  controllers: [SalonController],
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
