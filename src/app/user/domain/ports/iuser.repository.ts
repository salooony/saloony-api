import { UpdateUserCriteria } from '../criteria/update-user.criteria';
import { User } from '../entities/user';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  updateOneById(id: string, updateCriteria: UpdateUserCriteria): Promise<void>;
}
