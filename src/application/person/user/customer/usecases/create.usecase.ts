import { CustomerRequestDto } from '@application/person/dtos/requests/customer.request';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response';
import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { HashingProviderInterface } from '@application/providers/hashing.provider.interface';
import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { ICustomerRepository } from '@domain/ports/customerRepository.interface';
import { Inject } from '@nestjs/common';

export class CreateCustomerUsecase {
  constructor(
    private readonly transformer: CustomerTransformer,
    @Inject('CustomersRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('HashingProvider')
    private readonly hashingProvider: HashingProviderInterface,
  ) {}

  async execute(
    customerRequestDto: CustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    const customer = this.transformer.toEntity(customerRequestDto) as Customer;
    customer.password = await this.hashingProvider.hash(customer.password);

    return CustomerResponseDto.createFromEntity(
      await this.customerRepository.save(customer),
    );
  }
}
