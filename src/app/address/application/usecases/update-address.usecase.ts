import { Inject, Injectable } from '@nestjs/common';
import { ADDRESS_REPOSITORY, IAddressRepository } from '@address/domain/ports/iaddress.repository';
import { Address } from '@address/domain/entities/address.entity';
import { AddressRequestDto } from '@address/application/dtos/requests/address.request.dto';

@Injectable()
export class UpdateAddressUsecase {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: IAddressRepository) {}

  async execute(addressId: string, dto: AddressRequestDto): Promise<{ status: 204 }> {
    const updated = new Address(addressId, dto.location, dto.postcode, dto.cityId, dto.address, dto.complement);

    await this.addressRepository.update(updated);
    return { status: 204 as const };
  }
}
