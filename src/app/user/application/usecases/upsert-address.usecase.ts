import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY, IUserRepository } from '@user/domain/ports/iuser.repository';
import { UpsertAddressRequestDto } from '@address/application/dtos/requests/upsert-address.request.dto';
import { AddressResponseDto } from '@address/application/dtos/responses/address.response.dto';
import { CreateAddressUsecase } from '@address/application/usecases/create-address.usecase';
import { UpdateAddressUsecase } from '@address/application/usecases/update-address.usecase';

export type UpsertAddressResult = { status: 201; data: AddressResponseDto } | { status: 204 };

@Injectable()
export class UpsertAddressUsecase {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly createAddressUsecase: CreateAddressUsecase,
    private readonly updateAddressUsecase: UpdateAddressUsecase,
  ) {}

  async execute(userId: string, dto: UpsertAddressRequestDto): Promise<UpsertAddressResult> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.addressId) {
      return this.updateAddressUsecase.execute(user.addressId, dto);
    }

    return this.createAddressUsecase.execute(user, dto);
  }
}
