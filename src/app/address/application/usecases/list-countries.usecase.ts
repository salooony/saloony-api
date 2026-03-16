import { Inject, Injectable } from '@nestjs/common';
import { ListCountriesRequestDto } from '../dtos/requests/list-countries.request.dto';
import { CountryResponseDto } from '../dtos/responses/country.response.dto';
import { COUNTRY_REPOSITORY, ICountryRepository } from '@address/domain/ports/icountry.repository';
import { normalizeCountryCode } from '@address/domain/constants/country-code.constants';

@Injectable()
export class ListCountriesUsecase {
  constructor(@Inject(COUNTRY_REPOSITORY) private readonly countryRepository: ICountryRepository) {}

  async execute(filters: ListCountriesRequestDto): Promise<CountryResponseDto[]> {
    const countries = await this.countryRepository.findAll({
      isActive: filters.isActive,
      name: filters.name?.trim() || undefined,
      code: filters.code ? normalizeCountryCode(filters.code) : undefined,
    });

    return countries.map((country) => CountryResponseDto.createFromEntity(country));
  }
}
