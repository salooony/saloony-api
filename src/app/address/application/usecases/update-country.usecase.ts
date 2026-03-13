import { ConflictException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { COUNTRY_REPOSITORY, ICountryRepository } from '@address/domain/ports/icountry.repository';
import { Country } from '@address/domain/entities/country.entity';
import { UpdateCountryRequestDto } from '../dtos/requests/update-country.request.dto';
import { CountryResponseDto } from '../dtos/responses/country.response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCountryUsecase {
  constructor(@Inject(COUNTRY_REPOSITORY) private readonly countryRepository: ICountryRepository) {}

  async execute(id: string, dto: UpdateCountryRequestDto): Promise<CountryResponseDto> {
    const existing = await this.countryRepository.findOneById(id);

    if (!existing) {
      throw new NotFoundException('Country not found.');
    }

    const country = new Country(
      existing.id,
      dto.code.toUpperCase().slice(0, 5),
      dto.icon ?? existing.icon,
      dto.name,
      dto.isActive ?? existing.isActive,
    );

    try {
      const updated = await this.countryRepository.update(country);
      return CountryResponseDto.createFromEntity(updated);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new ConflictException('A country with the same code already exists.');
      }

      throw new InternalServerErrorException('Failed to update country.');
    }
  }
}
