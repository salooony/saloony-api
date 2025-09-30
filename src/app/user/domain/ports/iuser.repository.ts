import { User } from '../entities/user';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findOneByEmail(email: string): Promise<User | null>;
}
