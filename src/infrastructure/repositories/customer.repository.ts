import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { ICustomerRepository } from '@domain/ports/customerRepository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Customer as CustomerEntity } from '@infrastructure/schemas/user/customer.schema';
import { HashingProviderInterface } from '@application/providers/hashing.provider.interface';

@Injectable()
export class CustomersRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
    @Inject('HashingProvider')
    private hashingProvider: HashingProviderInterface,
  ) {}

  async save(customer: Customer): Promise<Customer> {
    customer.password = await this.hashingProvider.hash(customer.password);

    const customerDoc = await this.repository.save(customer as unknown as CustomerEntity);

    return customerDoc as unknown as Customer;
  }
}
