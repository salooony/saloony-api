import { UserRequestDto } from '../dtos/requests/user.request.dto';
import { UserTransformer } from './user.transformer';
import { Customer } from '@domain/entities/person/users/customer.entity';

export class CustomerTransformer extends UserTransformer {
  userProps(customerRequest: UserRequestDto): Customer {
    const customer = new Customer();

    return customer;
  }
}
