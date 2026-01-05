import { Injectable } from '@nestjs/common';
import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetTokenEntity } from '../schemas/password-reset-token.entity';
import { PasswordResetToken } from '../../domain/entities/password-reset-token';
import { IPasswordResetTokenRepository } from '../../domain/ports/ipassword-reset-token.repository';

@Injectable()
export class PasswordResetTokenRepository implements IPasswordResetTokenRepository {
  constructor(
    @InjectRepository(PasswordResetTokenEntity)
    private readonly repository: Repository<PasswordResetTokenEntity>,
  ) {}

  async create(token: PasswordResetToken): Promise<PasswordResetToken> {
    const saved = await this.repository.save(token as PasswordResetTokenEntity);
    return saved as PasswordResetToken;
  }

  async findByUserIdAndTokenHash(
    userId: string,
    tokenHash: string,
  ): Promise<PasswordResetToken | null> {
    const token = await this.repository.findOne({ where: { userId, tokenHash } });
    return token ?? null;
  }

  async invalidate(tokenId: string): Promise<void> {
    await this.repository.update(tokenId, { usedAt: new Date() });
  }

  async deleteExpired(): Promise<void> {
    await this.repository.delete({ expiresAt: LessThan(new Date()) });
  }
}
