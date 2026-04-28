import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CITY_REPOSITORY, ICityRepository } from '@address/domain/ports/icity.repository';
import { COUNTRY_REPOSITORY, ICountryRepository } from '@address/domain/ports/icountry.repository';
import { CreateCityRequestDto } from '../dtos/requests/create-city.request.dto';
import { CityTransformer } from '../transformers/city.transformer';
import { CityResponseDto } from '../dtos/responses/city.response.dto';

@Injectable()
export class CreateCityUsecase {
  constructor(
    @Inject(CITY_REPOSITORY) private readonly cityRepository: ICityRepository,
    @Inject(COUNTRY_REPOSITORY) private readonly countryRepository: ICountryRepository,
  ) {}

  async execute(dto: CreateCityRequestDto): Promise<CityResponseDto> {
    const country = await this.countryRepository.findOneById(dto.countryId);

    if (!country) {
      throw new NotFoundException('Country does not exist.');
    }

    const existingCity = await this.cityRepository.findOne({ name: dto.name, countryId: dto.countryId });

    if (existingCity) {
      throw new ConflictException('City already exists in this country.');
    }
    const city = CityTransformer.toDomain(dto, country);
    const created = await this.cityRepository.save(city);

    return CityResponseDto.createFromEntity(created);
  }
}
