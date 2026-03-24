import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CITY_REPOSITORY, ICityRepository } from '@address/domain/ports/icity.repository';

import { City } from '@address/domain/entities/city.entity';
import { CreateCityRequestDto } from '../dtos/requests/create-city.request.dto';
import { CityResponseDto } from '../dtos/responses/city.response.dto';
import { COUNTRY_REPOSITORY, ICountryRepository } from '@address/domain/ports/icountry.repository';

@Injectable()
export class CreateCityUsecase {
  constructor(
    @Inject(CITY_REPOSITORY) private readonly cityRepository: ICityRepository,
    @Inject(COUNTRY_REPOSITORY) private readonly countryRepository: ICountryRepository,
  ) {}

  async execute(dto: CreateCityRequestDto): Promise<CityResponseDto> {
    const country = await this.countryRepository.findOneById(dto.countryId);

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    const city = new City('', dto.name, country);

    const created = await this.cityRepository.save(city);

    return CityResponseDto.createFromEntity(created);
  }
}
