import { User } from '../entities/user';
import { Token } from '../entities/token';

export const TOKEN_GENERATOR = 'TokenGenerator';

export interface ITokenGenerator {
  generateTokens(user: User): Promise<Token>;
}
