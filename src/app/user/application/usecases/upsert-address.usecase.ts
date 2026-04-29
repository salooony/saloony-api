import { Injectable } from '@nestjs/common';
import { AddressRequestDto } from '@address/application/dtos/requests/address.request.dto';
import { AddressResponseDto } from '@address/application/dtos/responses/address.response.dto';
import { CreateAddressUsecase } from '@address/application/usecases/create-address.usecase';
import { UpdateAddressUsecase } from '@address/application/usecases/update-address.usecase';
import { User } from '@user/domain/entities/user';

export type UpsertAddressResult = { status: 201; data: AddressResponseDto } | { status: 204 };

@Injectable()
export class UpsertAddressUsecase {
  constructor(
    private readonly createAddressUsecase: CreateAddressUsecase,
    private readonly updateAddressUsecase: UpdateAddressUsecase,
  ) {}

  async execute(user: User, dto: AddressRequestDto): Promise<UpsertAddressResult> {
    if (user.addressId) {
      return await this.updateAddressUsecase.execute(user.addressId, dto);
    }

    return await this.createAddressUsecase.execute(user, dto);
  }
}
