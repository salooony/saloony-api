import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../schemas/country.schema';
import { CountryController } from '../controllers/country.controller';
import { CountryRepository } from '../repositories/country.repository';
import { COUNTRY_REPOSITORY } from '@address/domain/ports/icountry.repository';
import { CreateCountryUsecase } from '@address/application/usecases/create-country.usecase';
import { ListCountriesUsecase } from '@address/application/usecases/list-countries.usecase';
import { UpdateCountryUsecase } from '@address/application/usecases/update-country.usecase';
import { CreateAddressUsecase } from '@address/application/usecases/create-address.usecase';
import { UpdateAddressUsecase } from '@address/application/usecases/update-address.usecase';
import { AddressRepository } from '../repositories/address.repository';
import { ADDRESS_REPOSITORY } from '@address/domain/ports/iaddress.repository';
import { Address } from '../schemas/address.schema';
import { forwardRef } from '@nestjs/common';
import { UserModule } from '@user/infrastructure/modules/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Address]), forwardRef(() => UserModule)],

  controllers: [CountryController],
  providers: [
    CreateCountryUsecase,
    ListCountriesUsecase,
    UpdateCountryUsecase,
    CreateAddressUsecase,
    UpdateAddressUsecase,
    { provide: COUNTRY_REPOSITORY, useClass: CountryRepository },
    { provide: ADDRESS_REPOSITORY, useClass: AddressRepository },
  ],
  exports: [CreateAddressUsecase, UpdateAddressUsecase],
})
export class AddressModule {}
