import { User } from '@domain/entities/users/user.entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
}
