import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../schemas/country.schema';
import { City } from '../schemas/city.schema';
import { CountryController } from '../controllers/country.controller';
import { CityController } from '../controllers/city.controller';
import { CountryRepository } from '../repositories/country.repository';
import { CityRepository } from '@address/infrastructure/repositories/city.repository';
import { COUNTRY_REPOSITORY } from '@address/domain/ports/icountry.repository';
import { CITY_REPOSITORY } from '@address/domain/ports/icity.repository';
import { CreateCountryUsecase } from '@address/application/usecases/create-country.usecase';
import { UpdateCountryUsecase } from '@address/application/usecases/update-country.usecase';
import { CreateCityUsecase } from '@address/application/usecases/create-city.usecase';
import { ListCountriesUsecase } from '@address/application/usecases/list-countries.usecase';


@Module({
  imports: [TypeOrmModule.forFeature([Country ,  City])],
  controllers: [CountryController ,  CityController],
  providers: [
    CreateCountryUsecase,
    UpdateCountryUsecase,
    CreateCityUsecase,
    ListCountriesUsecase,
  
    {
      provide: COUNTRY_REPOSITORY,
      useClass: CountryRepository,
    },

    {
      provide: CITY_REPOSITORY,
      useClass: CityRepository,
    },
  ],
})
export class AddressModule {}
