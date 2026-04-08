import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetTokenEntity } from '../schemas/password-reset-token.schema';
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

  async findByUserIdAndTokenHash(userId: string, tokenHash: string): Promise<PasswordResetToken | null> {
    const token = await this.repository.findOne({ where: { userId, tokenHash } });
    return token ?? null;
  }

  async findByTokenHash(tokenHash: string): Promise<PasswordResetToken | null> {
    const entity = await this.repository.findOne({ where: { tokenHash } });
    if (!entity) return null;

    return new PasswordResetToken({
      id: entity.id,
      userId: entity.userId,
      tokenHash: entity.tokenHash,
      expiresAt: entity.expiresAt,
      usedAt: entity.usedAt,
      createdAt: entity.createdAt,
      type: entity.type,
    });
  }

  async deleteById(tokenId: string): Promise<void> {
    await this.repository.delete(tokenId);
  }
}
