import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ADDRESS_REPOSITORY, IAddressRepository } from '@address/domain/ports/iaddress.repository';
import { Address } from '@address/domain/entities/address.entity';
import { UpsertAddressRequestDto } from '../dtos/requests/upsert-address.request.dto';

@Injectable()
export class UpdateAddressUsecase {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: IAddressRepository) {}

  async execute(addressId: string, dto: UpsertAddressRequestDto): Promise<{ status: 204 }> {
    const existing = await this.addressRepository.findById(addressId);

    if (!existing) {
      throw new NotFoundException('Address not found.');
    }

    const updated = new Address(existing.id, dto.location, dto.postcode, dto.cityId, dto.address, dto.complement);

    await this.addressRepository.update(updated);
    return { status: 204 as const };
  }
}
