import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CITY_REPOSITORY, ICityRepository } from '@address/domain/ports/icity.repository';

import { COUNTRY_REPOSITORY, ICountryRepository } from '@address/domain/ports/icountry.repository';

import { City } from '@address/domain/entities/city.entity';
import { CreateCityRequestDto } from '../dtos/requests/create-city.request.dto';
import { CityResponseDto } from '../dtos/responses/city.response.dto';
import { Country } from '@address/domain/entities/country.entity';

@Injectable()
export class CreateCityUsecase {
  constructor(
    @Inject(CITY_REPOSITORY) private readonly cityRepository: ICityRepository,
    @Inject(COUNTRY_REPOSITORY) private readonly countryRepository: ICountryRepository,
  ) {}

  async execute(dto: CreateCityRequestDto): Promise<CityResponseDto> {
    const country: Country | null = await this.countryRepository.findOneById(dto.countryId);
    if (!country) {
      throw new NotFoundException('Country does not exist');
    }

    const city = new City('', dto.name, country);

    const created = await this.cityRepository.save(city);

    return CityResponseDto.createFromEntity(created);
  }
}
