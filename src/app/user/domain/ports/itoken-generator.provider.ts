import { Token } from '../entities/token';
import { User } from '../entities/user';

export interface ITokenGenerator {
  generateTokens(user: User): Promise<Token>;
}
