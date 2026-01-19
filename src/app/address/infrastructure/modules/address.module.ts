import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../schemas/country.schema';
import { City } from '../schemas/city.schema';
import { Address } from '../schemas/address.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, City, Address]),
  ],
})
export class AddressModule {}
