import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CITY_REPOSITORY, ICityRepository } from '@address/domain/ports/icity.repository';

import { City } from '@address/domain/entities/city.entity';
import { CreateCityRequestDto } from '../dtos/requests/create-city.request.dto';
import { CityResponseDto } from '../dtos/responses/city.response.dto';


@Injectable()
export class CreateCityUsecase {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly cityRepository: ICityRepository,
  ) {}

  async execute(dto: CreateCityRequestDto): Promise<CityResponseDto> {
    const city = new City('', dto.name, country)
    

    const created = await this.cityRepository.save(city);

    return CityResponseDto.createFromEntity(created);
  }
}
