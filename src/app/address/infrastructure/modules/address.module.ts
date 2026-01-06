import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { Address } from '../schemas/address.entity';
import { AddressController } from '../controllers/address.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [{ provide: 'AddressRepository', useClass: AddressRepository }],
  exports: [{ provide: 'AddressRepository', useClass: AddressRepository }],
})
export class AddressModule {}
