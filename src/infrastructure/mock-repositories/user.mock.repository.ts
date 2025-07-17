import { HashingProviderInterface } from '@application/providers/hashing.provider.interface';
import { User } from '@domain/entities/user';
import { IUserRepository } from '@domain/ports/iuser.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MockUsersReporitory implements IUserRepository {
  constructor(@Inject('HashingProvider') private hashingProvider: HashingProviderInterface) {}

  public static users = new Array<User>();

  async save(user: User): Promise<User> {
    MockUsersReporitory.users.map((oldUser) => {
      if (oldUser.email === user.email) {
        throw new Error('duplicate key');
      }
    });

    user.password = await this.hashingProvider.hash(user.password);
    user.id = MockUsersReporitory.users.length + 1;

    MockUsersReporitory.users.push(user);

    return user;
  }
}
