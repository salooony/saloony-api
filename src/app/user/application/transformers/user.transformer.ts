import { UserRequestDto } from '../dtos/requests/user.request.dto';
import { User } from '../../domain/entities/user';

export class UserTransformer {
  toEntity(userRequest: UserRequestDto): User {
    const user = new User();

    user.firstname = userRequest.firstname;
    user.lastname = userRequest.lastname;
    user.avatar = '';
    user.role = userRequest.role;
    user.birthdate = userRequest.birthdate;
    user.email = userRequest.email;
    user.mobileNumber = userRequest.mobileNumber;
    user.password = userRequest.password;
    user.language = userRequest.language;

    user.acl = [];

    return user;
  }
}
