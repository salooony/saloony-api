import { Inject, Injectable } from '@nestjs/common';
import { ListCountriesRequestDto } from '../dtos/requests/list-countries.request.dto';
import { CountryResponseDto } from '../dtos/responses/country.response.dto';
import { ICountryRepository } from '@address/domain/ports/icountry.repository';

@Injectable()
export class ListCountriesUsecase {
  constructor(@Inject('ICountryRepository') private readonly countryRepository: ICountryRepository) {}

  async execute(filters: ListCountriesRequestDto): Promise<CountryResponseDto[]> {
    const countries = await this.countryRepository.findAll({
      isActive: filters.isActive,
      name: filters.name?.trim() || undefined,
      code: filters.code,
    });

    return countries.map((country) => CountryResponseDto.createFromEntity(country));
  }
}
