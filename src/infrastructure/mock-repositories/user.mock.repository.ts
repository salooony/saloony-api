import { HashingProviderInterface } from '@application/providers/hashing.provider.interface';
import { User } from '@domain/entities/person/users/user.entity';
import { IUserRepository } from '@domain/ports/userRepository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MockUsersReporitory implements IUserRepository {
  constructor(
    @Inject('HashingProvider')
    private hashingProvider: HashingProviderInterface,
  ) {}

  users = new Array<User>();

  async save(user: User): Promise<User> {
    // console.log(this.users);
    this.users.map((oldUser) => {
      console.log(oldUser);
      if (oldUser.email === user.email) {
        throw new BadRequestException();
      }
    });

    user.password = await this.hashingProvider.hash(user.password);
    user.id = (this.users.length + 1).toString();

    this.users.push(user);
    // console.log(this.users);

    return user;
  }
}
