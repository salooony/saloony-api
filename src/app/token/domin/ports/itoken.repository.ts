import { Token } from '../entities/token.entity';

export const TOKEN_REPOSITORY = 'ITokenRepository';

export interface ITokenRepository {
  save(token: Token): Promise<void>;
  findByToken(token: string, ownerId?: string): Promise<Token | null>;
}
