import { User } from '@domain/entities/user';
import { UserRequestDto } from '../dtos/requests/user.request.dto';

export class UserTransformer {
  toEntity(userRequest: UserRequestDto): User {
    const user = new User();

    user.firstname = userRequest.firstname;
    user.lastname = userRequest.lastname;
    user.birthdate = userRequest.birthdate;
    user.email = userRequest.email;
    user.mobileNumber = userRequest.mobileNumber;
    user.password = userRequest.password;
    user.createdAt = new Date();
    user.updatedAt = user.createdAt;
    user.language = userRequest.language;

    user.saloons = [];

    return user;
  }
}
