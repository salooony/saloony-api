import { User } from '@domain/entities/user';
import { User as UserEntity } from '@infrastructure/schemas/user.entity';

export class UserMapper {
  private constructor() {}

  static map(createdUser: UserEntity): User {
    const user = new User();

    user.id = createdUser.id;
    user.firstname = createdUser.firstname;
    user.lastname = createdUser.lastname;
    user.birthdate = createdUser.birthdate;
    user.role = createdUser.role;
    user.email = createdUser.email;
    user.mobileNumber = createdUser.mobileNumber;
    user.password = createdUser.password;
    user.createdAt = createdUser.createdAt;
    user.updatedAt = createdUser.updatedAt;
    user.language = createdUser.language;
    //   public saloons: Array<{ saloon: Saloon; role: SaloonRoles }> = [];

    return user;
  }
}
