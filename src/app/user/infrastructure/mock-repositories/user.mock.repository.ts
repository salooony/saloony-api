import { UpdateUserCriteria } from '@app/user/domain/criteria/update-user.criteria';
import { User } from '@app/user/domain/entities/user';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { Injectable } from '@nestjs/common';
import { first } from 'rxjs';

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

    return Promise.resolve(user);
  }

  async findOneById(id: string): Promise<User | null> {
    const user = MockUsersReporitory.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return Promise.resolve(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = MockUsersReporitory.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return Promise.resolve(user);
  }

  async updateOneById(id: string, updateCriteria: UpdateUserCriteria): Promise<void> {
    const user = MockUsersReporitory.users.find((user) => user.id === id);
    if (!user) throw new Error();

    // update user here
    if (updateCriteria.firstname) user.firstname = updateCriteria.firstname;
    if (updateCriteria.lastname) user.lastname = updateCriteria.lastname;
    if (updateCriteria.avatar) user.avatar = updateCriteria.avatar;
    if (updateCriteria.birthdate) user.birthdate = updateCriteria.birthdate;
    if (updateCriteria.email) user.email = updateCriteria.email;
    if (updateCriteria.mobileNumber) user.mobileNumber = updateCriteria.mobileNumber;
    if (updateCriteria.language) user.language = updateCriteria.language;

    return Promise.resolve();
  }
}
