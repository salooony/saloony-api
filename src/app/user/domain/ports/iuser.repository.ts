import { User } from '../entities/user';

export interface IUserRepository {
  save(user: User): Promise<User>;
  verifyEmail(email: string): Promise<void>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  delete(userId: string): Promise<void>;
  update(user: User): Promise<User>;
}
