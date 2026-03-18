import { Injectable, Inject } from '@nestjs/common';
import { createHash } from 'crypto';
import { TokenGeneratorService } from '@token/application/service/token-generator.service';
import { TokenGeneratorType } from '@token/domain/enums/token-generator-type.enum';
import { Token } from '@token/domain/entities/token.entity';
import { ITokenRepository, TOKEN_REPOSITORY } from '@token/domain/ports/itoken.repository';
import { IUserRepository } from '@user/domain/ports/iuser.repository';
import { TokenValidationReason } from '@token/domain/enums/tokenValidationreason-enum';
import { UserStatus } from '@user/domain/enums/user-status.enum';
@Injectable()
export class TokenService {
  constructor(
    private readonly generator: TokenGeneratorService,
    @Inject(TOKEN_REPOSITORY) private readonly tokenRepository: ITokenRepository,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async issue(
    ownerId: string,
    type: TokenGeneratorType,
    options?: {
      generatorOptions?: Record<string, unknown>;
      expiresAt?: Date;
      expiresInSeconds?: number;
      hash?: boolean;
    },
  ): Promise<Token> {
    const plainToken = this.generator.generate(type, options?.generatorOptions);

    let tokenToStore = plainToken;

    let expiredAt: Date | null = null;

    if (options?.expiresAt) {
      expiredAt = options.expiresAt;
    } else if (options?.expiresInSeconds) {
      expiredAt = new Date(Date.now() + options.expiresInSeconds * 1000);
    }

    if (options?.hash) {
      tokenToStore = createHash('sha256').update(plainToken).digest('hex');
    }

    const user = await this.userRepository.findOneById(ownerId);

    if (!user) {
      throw new Error('User does not exist.');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new Error('User is not active.');
    }

    const tokenEntity = new Token(tokenToStore, new Date(), expiredAt, options?.hash ?? false, user);

    return await this.tokenRepository.save(tokenEntity);
  }

  async validate(token: string, ownerId?: string): Promise<{ valid: boolean; reason?: TokenValidationReason }> {
    let stored = await this.tokenRepository.findByToken(token, ownerId);

    if (!stored) {
      const hashed = createHash('sha256').update(token).digest('hex');
      stored = await this.tokenRepository.findByToken(hashed, ownerId);
    }

    if (!stored) {
      return { valid: false, reason: TokenValidationReason.NOT_FOUND };
    }

    if (stored.isExpired()) {
      return { valid: false, reason: TokenValidationReason.EXPIRED };
    }

    return { valid: true };
  }
}
