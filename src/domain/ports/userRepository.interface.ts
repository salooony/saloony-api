import { User } from '@domain/entities/person/users/user.entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
}
