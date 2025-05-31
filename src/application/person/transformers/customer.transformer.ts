import { CustomerRequestDto } from '../dtos/requests/customer.request';
import { UserTransformer } from './user.transformer';
import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { Location } from '@domain/entities/location.entity';

export class CustomerTransformer extends UserTransformer {
  userProps(customerRequest: CustomerRequestDto): Customer {
    const customer = new Customer();

    customer.calendarURL = '';
    // customer.location = new Location();
    customer.location = '';

    return customer;
  }
}
