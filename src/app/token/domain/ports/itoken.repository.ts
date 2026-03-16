import { Token } from '../entities/token.entity';

export const TOKEN_REPOSITORY = 'ITokenRepository';

export interface ITokenRepository {
  save(token: Token): Promise<Token>;
  findByToken(token: string, ownerId?: string): Promise<Token | null>;
}
