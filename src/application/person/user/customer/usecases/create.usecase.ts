import { CustomerRequestDto } from '@application/person/dtos/requests/customer.request';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response';
import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { Customer } from '@domain/entities/person/users/customer.entity';
import { ICustomerRepository } from '@domain/ports/customerRepository.interface';
import { Inject } from '@nestjs/common';

export class CreateCustomerUsecase {
  constructor(
    private readonly transformer: CustomerTransformer,
    @Inject('CustomersRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(customerRequestDto: CustomerRequestDto): Promise<CustomerResponseDto> {
    const customer = this.transformer.toEntity(customerRequestDto) as Customer;

    return CustomerResponseDto.createFromEntity(await this.customerRepository.save(customer));
  }
}
