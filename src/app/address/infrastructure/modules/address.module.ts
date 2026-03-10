import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../schemas/country.schema';
import { CountryController } from '../controllers/country.controller';
import { CountryRepository } from '../repositories/country.repository';
import { COUNTRY_REPOSITORY } from '@address/domain/ports/icountry.repository';
import { CreateCountryUsecase } from '@address/application/usecases/create-country.usecase';
import { UpdateCountryUsecase } from '@address/application/usecases/update-country.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [
    CreateCountryUsecase,
    UpdateCountryUsecase,
    {
      provide: COUNTRY_REPOSITORY,
      useClass: CountryRepository,
    },
  ],
})
export class AddressModule {}
