import { User } from '@domain/entities/user';

export interface IUserRepository {
  save(user: User): Promise<User>;
}
