import { UserMapper } from './user.mapper';
import { Customer } from '@domain/entities/person/users/customer.entitiy';

export class CustomerMapper extends UserMapper {
  private static customerMapper: CustomerMapper;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.customerMapper === null) {
      this.customerMapper = new CustomerMapper();
    }

    return this.customerMapper;
  }

  userProps(customerDocument: Customer): Customer {
    const customer = new Customer();

    // customer.location =

    return customer;
  }
}
