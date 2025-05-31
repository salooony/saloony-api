import { Customer } from '@domain/entities/person/users/customer.entitiy';

export interface ICustomerRepository {
  save(customer: Customer): Promise<Customer>;
}
