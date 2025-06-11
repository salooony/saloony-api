import { Customer } from '@domain/entities/person/users/customer.entity';
import { ICustomerRepository } from '@domain/ports/customerRepository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockCustomersReporitory implements ICustomerRepository {
  customers = new Array<Customer>();

  async save(customer: Customer): Promise<Customer> {
    this.customers.push(customer);

    return customer;
  }
}
