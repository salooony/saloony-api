import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, IUserRepository } from '../../domain';
import { User as UserEntity } from '../schemas/user.schema';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  async save(user: User): Promise<User> {
    const savedUser = await this.repository.save(UserMapper.toEntity(user));

    return UserMapper.map(savedUser);
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    return UserMapper.map(user);
  }

  // Get user by email
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return UserMapper.map(user);
  }

  async deleteOneById(userId: string): Promise<void> {
    await this.repository.softDelete(userId);
  }

  async updateOne(user: User): Promise<void> {
    await this.repository.update({ id: user.id }, UserMapper.toEntity(user));
  }
}
