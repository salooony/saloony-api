import { User } from '@app/user/domain/entities/user';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockUsersReporitory implements IUserRepository {
  public static users = new Array<User>();

  async save(user: User): Promise<User> {
    MockUsersReporitory.users.map((oldUser) => {
      if (oldUser.email === user.email) {
        throw new Error('duplicate key');
      }
    });

    user.id = (MockUsersReporitory.users.length + 1).toString();
    user.createdAt = new Date();

    MockUsersReporitory.users.push(user);

    return user;
  }
}
