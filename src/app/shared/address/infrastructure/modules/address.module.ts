import { Module } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';

@Module({
  providers: [{ provide: 'AddressRepository', useClass: AddressRepository }],
  exports: [{ provide: 'AddressRepository', useClass: AddressRepository }],
})
export class AddressModule {}
