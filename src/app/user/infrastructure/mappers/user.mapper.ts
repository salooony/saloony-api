import { User } from '@app/user/domain/entities/user';
import { User as UserEntity } from '../schemas/user.schema';

export class UserMapper {
  static map(createdUser: UserEntity): User {
    const user = new User();

    user.id = createdUser.id;
    user.firstname = createdUser.firstname;
    user.lastname = createdUser.lastname;
    user.avatar = createdUser.avatar;
    user.birthdate = createdUser.birthdate;
    user.role = createdUser.role;
    user.email = createdUser.email;
    user.mobileNumber = createdUser.mobileNumber;
    user.password = createdUser.password;
    user.createdAt = createdUser.createdAt;
    user.updatedAt = createdUser.updatedAt;
    user.language = createdUser.language;
    user.acl = createdUser.acl;
    user.status = createdUser.status;
    user.deletedAt = createdUser.deletedAt;
    return user;
  }

  static toEntity(user: User): UserEntity {
    const entity = new UserEntity();

    entity.firstname = user.firstname;
    entity.lastname = user.lastname;
    entity.avatar = user.avatar;
    entity.birthdate = user.birthdate;
    entity.role = user.role;
    entity.email = user.email;
    entity.mobileNumber = user.mobileNumber;
    entity.password = user.password;
    entity.language = user.language;
    entity.acl = user.acl;
    entity.deletedAt = user.deletedAt;
    entity.status = user.status;
    return entity;
  }
}
