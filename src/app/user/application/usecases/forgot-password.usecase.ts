import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

import { ForgotPasswordRequestDto } from '..';
import { IUserRepository, USERS_REPOSITORY } from '../../domain';

@Injectable()
export class ForgotPasswordUsecase {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
    // @Inject('PasswordResetTokensRepository')
    // private readonly passwordResetTokenRepository: IPasswordResetTokensRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(forgotPasswordRequest: ForgotPasswordRequestDto): Promise<void> {
    const email = forgotPasswordRequest.email.toLowerCase().trim();

    const ttlMs: number = Number(this.configService.get<string>('PASSWORD_RESET_TOKEN_TTL_MS') ?? '900000');

    const user = await this.userRepository.findOneByEmail(email);
    if (!user) return;

    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    console.log(ttlMs, tokenHash);

    // const tokenEntity = new PasswordResetToken({
    //   userId: user.id,
    //   tokenHash,
    //   expiresAt: new Date(Date.now() + ttlMs),
    // });

    // await this.passwordResetTokenRepository.create(tokenEntity);
    // TODO: [TICKET] Re-enable email delivery once the mailer integration is implemented.
  }
}
