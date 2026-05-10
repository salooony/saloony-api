import { User, Token } from '..';

export const TOKEN_GENERATOR = 'TokenGenerator';

export interface ITokenGenerator {
  generateTokens(user: User): Promise<Token>;
}
