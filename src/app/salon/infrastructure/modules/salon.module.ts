import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salon } from '../schemas/salon.entity';

/**
 * Empty module for Salon entity per user request.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Salon])],
  controllers: [],
  providers: [],
})
export class SalonModule {}
