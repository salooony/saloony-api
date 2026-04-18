import { Inject, Injectable } from '@nestjs/common';
import { ADDRESS_REPOSITORY, IAddressRepository } from '@address/domain/ports/iaddress.repository';
import { USERS_REPOSITORY, IUserRepository } from '@user/domain/ports/iuser.repository';
import { Address } from '@address/domain/entities/address.entity';
import { UpsertAddressRequestDto } from '../dtos/requests/upsert-address.request.dto';
import { AddressResponseDto } from '../dtos/responses/address.response.dto';
import { User } from '@user/domain/entities/user';
import { AddressTransformer } from '../transformers/address.transformer';

@Injectable()
export class CreateAddressUsecase {
  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: IAddressRepository,
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: User, dto: UpsertAddressRequestDto): Promise<{ status: 201; data: AddressResponseDto }> {
    const created = await this.addressRepository.create(
      new Address('', dto.location, dto.postcode, dto.cityId, dto.address, dto.complement),
    );

    user.addressId = created.id;
    await this.userRepository.update(user);

    return { status: 201 as const, data: AddressTransformer.toResponse(created) };
  }
}
