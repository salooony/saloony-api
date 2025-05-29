import { Customer } from '@domain/entities/person/users/customer.etitiy';
import { ICustomerRepository } from '@domain/ports/customerRepository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  async save(customer: Customer): Promise<Customer> {
    return customer;
  }
}
