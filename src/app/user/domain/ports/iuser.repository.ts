import { User } from '../entities/user';

export const USERS_REPOSITORY = 'UsersRepository';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findOneByMobileNumber(mobileNumber: string): Promise<User | null>;
  delete(userId: string): Promise<void>;
  update(user: User): Promise<User>;
}
