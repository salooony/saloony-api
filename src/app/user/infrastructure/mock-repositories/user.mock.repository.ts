import { User } from '@app/user/domain/entities/user';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockUsersReporitory implements IUserRepository {
  public static users = new Array<User>();

  async save(user: User): Promise<User> {
    MockUsersReporitory.users.map((oldUser) => {
      if (oldUser.email === user.email || oldUser.mobileNumber === user.mobileNumber) {
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

  async findOneByMobileNumber(mobileNumber: string): Promise<User | null> {
    const user = MockUsersReporitory.users.find((entry) => entry.mobileNumber === mobileNumber);

    if (!user) {
      return null;
    }

    return Promise.resolve(user);
  }

  async update(user: User): Promise<User> {
    const index = MockUsersReporitory.users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const current = MockUsersReporitory.users[index] as User;

    Object.assign(current, user, { updatedAt: new Date() });

    return Promise.resolve(current);
  }

  delete(userId: string): Promise<void> {
    const user = MockUsersReporitory.users.find((user) => user.id === userId);
    if (user) {
      user.deletedAt = new Date();
    }

    return Promise.resolve();
  }
}
