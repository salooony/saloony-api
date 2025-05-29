import { CustomerRequestDto } from '@application/person/dtos/requests/customer.request';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response';
import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { Customer } from '@domain/entities/person/users/customer.etitiy';
import { ICustomerRepository } from '@domain/ports/customerRepository.interface';
import { Inject } from '@nestjs/common';

export class CreateCustomerUsecase {
  constructor(
    private readonly transformer: CustomerTransformer,
    @Inject('CustomerRepository')
    private readonly repository: ICustomerRepository,
  ) {}

  async execute(
    customerRequestDto: CustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    const customer = this.transformer.toEntity(customerRequestDto) as Customer;
    console.log(customer);

    return CustomerResponseDto.createFromEntity(
      await this.repository.save(customer),
    );
  }
}
