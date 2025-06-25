import { UserRequestDto } from '@application/person/dtos/requests/user.request.dto';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response.dto';
import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { Customer } from '@domain/entities/person/users/customer.entity';
import { IUserRepository } from '@domain/ports/userRepository.interface';
import { Inject } from '@nestjs/common';

export class CreateCustomerUsecase {
  constructor(
    private readonly transformer: CustomerTransformer,
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(customerRequestDto: UserRequestDto): Promise<CustomerResponseDto> {
    const customer = this.transformer.toEntity(customerRequestDto) as Customer;

    return CustomerResponseDto.createFromEntity(
      (await this.userRepository.save(customer)) as Customer,
    );
  }
}
