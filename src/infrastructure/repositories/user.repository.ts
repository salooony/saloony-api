import { IUserRepository } from '@domain/ports/userRepository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '@infrastructure/schemas/user.schema';
import { HashingProviderInterface } from '@application/providers/hashing.provider.interface';
import { User } from '@domain/entities/users/user.entity';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    @Inject('HashingProvider') private hashingProvider: HashingProviderInterface,
  ) {}

  async save(user: User): Promise<User> {
    user.password = await this.hashingProvider.hash(user.password);
    const userDoc = await this.repository.save({
      ...(user as unknown as UserEntity),
      role: user.getRole(),
    });

    return userDoc as unknown as User;
  }
}
