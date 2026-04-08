// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { ADDRESS_REPOSITORY, IAddressRepository } from '@address/domain/ports/iaddress.repository';
// import { IUserRepository } from '@user/domain/ports/iuser.repository';
// import { Address } from '@address/domain/entities/address.entity';
// import { UpsertAddressRequestDto } from '../dtos/requests/upsert-address.request.dto';
// import { AddressResponseDto } from '../dtos/responses/address.response.dto';

// export type UpsertAddressResult =
//   | { status: 201; data: AddressResponseDto }
//   | { status: 204 };

// @Injectable()
// export class UpsertUserAddressUsecase {
//   constructor(
//     @Inject(ADDRESS_REPOSITORY)
//     private readonly addressRepository: IAddressRepository,
//     @Inject('IUserRepository')private readonly userRepository: IUserRepository,
//   ) {}

//   async execute(userId: string, dto: UpsertAddressRequestDto): Promise<UpsertAddressResult> {
//     const user = await this.userRepository.findOneById(userId);

//     if (!user) {
//       throw new NotFoundException('User not found.');
//     }

//     if ((user as any).addressId)  {
//       return this.updateAddress(user.addressId, dto);
//     }

//     return this.createAddress(userId, dto);
//   }

//   private async updateAddress(addressId: string, dto: UpsertAddressRequestDto): Promise<UpsertAddressResult> {
//     const existing = await this.addressRepository.findById(addressId);

//     if (!existing) {
//       throw new NotFoundException('Address not found.');
//     }

//     const updated = new Address(
//       addressId,
//       dto.location,
//       dto.postcode,
//       dto.cityId,
//       dto.address,
//       dto.complement,
//     );

//     await this.addressRepository.update(updated);

//     return { status: 204 };
//   }

//   private async createAddress(userId: string, dto: UpsertAddressRequestDto): Promise<UpsertAddressResult> {

//     const created = await this.addressRepository.create(
//       new Address(
//         '',
//         dto.location,
//         dto.postcode,
//         dto.cityId,
//         dto.address,
//         dto.complement,
//       )
//     );

//     await this.userRepository.updateAddressId(userId, created.id);

//     return {
//       status: 201,
//       data: AddressResponseDto.createFromEntity(created),
//     };
//   }
// }
