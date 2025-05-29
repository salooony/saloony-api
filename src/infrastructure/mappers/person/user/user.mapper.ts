import { PersonMapper } from '../person.mapper';
import { User } from '@domain/entities/person/users/user.entity';

export abstract class UserMapper extends PersonMapper {
  internalProps(userDocument: User): User {
    const user = this.userProps(userDocument);

    // user.email =
    // user.mobileNumber =
    // user.password =
    // user.joinDate =

    return user;
  }

  abstract userProps(userDocument: User): User;
}
