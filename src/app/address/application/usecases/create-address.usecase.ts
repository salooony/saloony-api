import { Inject, Injectable } from '@nestjs/common';
import { ADDRESS_REPOSITORY, IAddressRepository } from '@address/domain/ports/iaddress.repository';
import { USERS_REPOSITORY, IUserRepository } from '@user/domain/ports/iuser.repository';
import { AddressRequestDto } from '@address/application/dtos/requests/address.request.dto';
import { AddressResponseDto } from '../dtos/responses/address.response.dto';
import { User } from '@user/domain/entities/user';
import { AddressTransformer } from '../transformers/address.transformer';

@Injectable()
export class CreateAddressUsecase {
  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: IAddressRepository,
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: User, dto: AddressRequestDto): Promise<{ status: 201; data: AddressResponseDto }> {
    const created = await this.addressRepository.create(AddressTransformer.toDomain(dto));

    user.addressId = created.id;
    await this.userRepository.update(user);

    return { status: 201 as const, data: AddressResponseDto.createFromEntity(created) };
  }
}
