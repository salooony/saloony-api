import { CustomerRequestDto } from '../dtos/requests/customer.request';
import { UserTransformer } from './user.transformer';
import { Customer } from '@domain/entities/person/users/customer.entity';

export class CustomerTransformer extends UserTransformer {
  userProps(customerRequest: CustomerRequestDto): Customer {
    const customer = new Customer();

    customer.calendarURL = '';

    return customer;
  }
}
