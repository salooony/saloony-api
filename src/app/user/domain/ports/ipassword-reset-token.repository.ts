import { PasswordResetToken } from '../entities/password-reset-token';

export interface IPasswordResetTokensRepository {
  create(token: PasswordResetToken): Promise<PasswordResetToken>;
  findByUserIdAndTokenHash(userId: string, tokenHash: string): Promise<PasswordResetToken | null>;
  deleteById(tokenId: string): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<PasswordResetToken | null>;
}
