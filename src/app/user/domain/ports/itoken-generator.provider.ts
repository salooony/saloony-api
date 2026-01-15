import { Token } from '../entities/token.entity';
import { User } from '../entities/user.entity';

export interface ITokenGenerator {
  generateTokens(user: User): Promise<Token>;
}
