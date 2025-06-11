import { Customer } from '@domain/entities/person/users/customer.entity';

export interface ICustomerRepository {
  save(customer: Customer): Promise<Customer>;
}
