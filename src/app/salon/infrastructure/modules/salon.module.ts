import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salon } from '../schemas/salon.entity';
import { SalonController } from '../controllers/salon.controller';
import { SalonRepository } from '../providers/salon.repository';
import { ISALON_REPOSITORY } from '@salon/domain/ports/isalon.repository';

/**
 * SalonModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([Salon])],
  controllers: [SalonController],
  providers: [
    SalonRepository,
    {
      provide: ISALON_REPOSITORY,
      useClass: SalonRepository,
    },
  ],
  exports: [ISALON_REPOSITORY],
})
export class SalonModule {}
