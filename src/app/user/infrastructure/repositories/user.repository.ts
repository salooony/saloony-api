import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../schemas/user.schema';
import { User } from '@user/domain/entities/user';
import { UserMapper } from '../mappers/user.mapper';
import { UserStatus } from '@user/domain/enums/user-status.enum';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  async save(user: User): Promise<User> {
    const savedUser = await this.repository.save(UserMapper.toEntity(user));

    return UserMapper.map(savedUser);
  }

  async verifyEmail(email: string): Promise<void> {
    await this.repository.update(
      { email },
      {
        status: UserStatus.WAITING_PHONE_VERIFICATION,
      },
    );
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) return null;

    return UserMapper.map(user);
  }

  // Get user by email
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });

    if (!user) return null;

    return UserMapper.map(user);
  }

  async delete(userId: string): Promise<void> {
    await this.repository.softDelete(userId);
  }
  async update(user: User): Promise<User> {
    const entity = UserMapper.toEntity(user);
    const saved = await this.repository.save(entity);

    return UserMapper.map(saved);
  }
}
