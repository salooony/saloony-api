import { Customer } from '@domain/entities/person/users/customer.entity';
import { IUserRepository } from '@domain/ports/userRepository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '@infrastructure/schemas/user.schema';
import { HashingProviderInterface } from '@application/providers/hashing.provider.interface';
import { Roles } from '@domain/enums/roles.enum';
import { User } from '@domain/entities/person/users/user.entity';
import { SaloonUser } from '@domain/entities/person/users/saloon-user.entity';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @Inject('HashingProvider')
    private hashingProvider: HashingProviderInterface,
  ) {}

  async save(user: User): Promise<User> {
    user.password = await this.hashingProvider.hash(user.password);
    let userDoc;

    if (user.getRole() === Roles.CUSTOMER) {
      try {
        console.log('trying here');
        userDoc = await this.repository.save({
          ...(user as unknown as UserEntity),
          role: Roles.CUSTOMER,
        });
      } catch (error: any) {
        if (error.message.includes('duplicate key')) {
          throw new BadRequestException(
            'A user with the same email and/or mobileNumber already exists.',
          );
        } else console.log(error.message);
      }

      return userDoc as unknown as Customer;
    } else {
      try {
        userDoc = await this.repository.save({
          ...(user as unknown as UserEntity),
          role: Roles.SALOON_USER,
        });
      } catch (error: any) {
        if (error.message.includes('duplicate key')) {
          throw new BadRequestException(
            'A user with the same email and/or mobileNumber already exists.',
          );
        } else console.log(error.message);
      }

      return userDoc as unknown as SaloonUser;
    }
  }
}
