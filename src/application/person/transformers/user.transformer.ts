import { User } from '@domain/entities/person/users/user.entity';
import { UserRequestDto } from '../dtos/requests/user.request.dto';
import { PersonTransformer } from './person.transformer';

export abstract class UserTransformer extends PersonTransformer {
  internalProps(userRequest: UserRequestDto): User {
    const user = this.userProps(userRequest);

    user.email = userRequest.email;
    user.mobileNumber = userRequest.mobileNumber;
    user.password = userRequest.password;
    user.joinDate = new Date();
    user.language = userRequest.language;

    return user;
  }

  abstract userProps(userRequest: UserRequestDto): User;
}
