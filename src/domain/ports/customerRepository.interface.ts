import { Customer } from '@domain/entities/person/users/customer.etitiy';

export interface ICustomerRepository {
  save(customer: Customer): Promise<Customer>;
}
