import { Injectable, Inject } from '@nestjs/common';
import * as crypto from 'crypto';
import { ForgotPasswordRequestDto } from '../dtos/requests/forgot-password.request.dto';
import { PasswordResetToken } from '../../domain/entities/password-reset-token';
import { IUserRepository } from '../../domain/ports/iuser.repository';
import { IPasswordResetTokenRepository } from '../../domain/ports/ipassword-reset-token.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,

    @Inject('PasswordResetTokenRepository')
    private readonly passwordResetTokenRepository: IPasswordResetTokenRepository,
  ) {}

  async execute(forgotPasswordRequest: ForgotPasswordRequestDto): Promise<void> {
    const email = forgotPasswordRequest.email.toLowerCase().trim();

    const ttlMs: number = Number(this.configService.get<string>('PASSWORD_RESET_TOKEN_TTL_MS') ?? '900000');

    const user = await this.userRepository.findOneByEmail(email);
    if (!user) return;

    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const tokenEntity = new PasswordResetToken({
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + ttlMs),
    });

    await this.passwordResetTokenRepository.create(tokenEntity);
    // Email delivery is disabled while the mailer integration is removed.
  }
}
