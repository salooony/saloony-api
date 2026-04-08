import { ConflictException, Inject, InternalServerErrorException } from '@nestjs/common';
import { COUNTRY_REPOSITORY, ICountryRepository } from '@address/domain/ports/icountry.repository';
import { normalizeCountryCode } from '@address/domain/constants/country-code.constants';
import { Country } from '@address/domain/entities/country.entity';
import { CreateCountryRequestDto } from '../dtos/requests/create-country.request.dto';
import { CountryResponseDto } from '../dtos/responses/country.response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCountryUsecase {
  constructor(@Inject(COUNTRY_REPOSITORY) private readonly countryRepository: ICountryRepository) {}

  async execute(dto: CreateCountryRequestDto): Promise<CountryResponseDto> {
    const country = new Country('', normalizeCountryCode(dto.code), dto.icon ?? '', dto.name, dto.isActive ?? true);

    try {
      const created = await this.countryRepository.save(country);
      return CountryResponseDto.createFromEntity(created);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new ConflictException('A country with the same code already exists.');
      }
      throw new InternalServerErrorException('Failed to create country.');
    }
  }
}
