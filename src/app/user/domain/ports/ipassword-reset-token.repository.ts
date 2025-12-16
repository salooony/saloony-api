import { PasswordResetToken } from '../entities/password-reset-token';

export interface IPasswordResetTokenRepository {
  create(token: PasswordResetToken): Promise<PasswordResetToken>;
  findByUserIdAndTokenHash(userId: string, tokenHash: string): Promise<PasswordResetToken | null>;
  invalidate(tokenId: string): Promise<void>;
  deleteExpired(): Promise<void>;
}
