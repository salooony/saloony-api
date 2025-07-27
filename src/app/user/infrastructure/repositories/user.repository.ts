import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../schemas/user.entity';
import { User } from '@app/user/domain/entities/user';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  async save(user: User): Promise<User> {
    const savedUser = await this.repository.save(UserMapper.toEntity(user));

    return UserMapper.map(savedUser);
  }
}
