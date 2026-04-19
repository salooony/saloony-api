import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salon } from '../schemas/salon.entity';
import { SalonController } from '../controllers/salon.controller';

/**
 * Empty module for Salon entity per user request.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Salon])],
  controllers: [SalonController],
  providers: [],
})
export class SalonModule {}
