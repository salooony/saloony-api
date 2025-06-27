import { User } from '@domain/entities/users/user.entity';
import { UserRequestDto } from '../dtos/requests/user.request.dto';
import { UserFactory } from '@domain/factories/user.factory';

export class UserTransformer {
  toEntity(userRequest: UserRequestDto): User {
    const user = UserFactory.create(userRequest.role);

    user.firstname = userRequest.firstname;
    user.lastname = userRequest.lastname;
    user.birthdate = userRequest.birthdate;
    user.email = userRequest.email;
    user.mobileNumber = userRequest.mobileNumber;
    user.password = userRequest.password;
    user.joinDate = new Date();
    user.language = userRequest.language;

    user.saloons = [];

    return user;
  }
}
