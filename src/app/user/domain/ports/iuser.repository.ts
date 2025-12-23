import { User } from '../entities/user';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  deactivate(userId: string): Promise<void>;
  activate(userId: string): Promise<void>;
}
