import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../schemas/country.schema';
import { CountryController } from '../controllers/country.controller';
import { CountryRepository } from '../repositories/country.repository';
import { CreateCountryUsecase } from '@address/application/usecases/create-country.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [
    CreateCountryUsecase,
    {
      provide: 'ICountryRepository',
      useClass: CountryRepository,
    },
  ],
})
export class AddressModule {}
