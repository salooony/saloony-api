import { SaloonUser } from '@domain/entities/person/users/saloon-user.entity';
import { UserTransformer } from './user.transformer';
import { UserRequestDto } from '../dtos/requests/user.request.dto';

export class SaloonUserTransformer extends UserTransformer {
  userProps(customerRequest: UserRequestDto): SaloonUser {
    const saloonUser = new SaloonUser();

    saloonUser.saloons = [];

    return saloonUser;
  }
}
