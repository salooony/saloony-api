import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { IPasswordResetTokenRepository } from '../../domain/ports/ipassword-reset-token.repository';
import { IUserRepository, USERS_REPOSITORY } from '../../domain/ports/iuser.repository';
// import { User } from '../../domain/entities/user';
type ResetPasswordCommand = { token: string; newPassword: string };

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject('PasswordResetTokenRepository')
    private readonly tokenRepository: IPasswordResetTokenRepository,

    @Inject(USERS_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ token, newPassword }: ResetPasswordCommand): Promise<void> {
    // 1. hash the token (because DB stores hash)
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 2. find token entity
    const tokenRecord = await this.tokenRepository.findByTokenHash(tokenHash);
    if (!tokenRecord) throw new BadRequestException('Invalid or expired token');

    // 3. check expiry
    if (tokenRecord.expiresAt < new Date()) {
      throw new BadRequestException('Token expired');
    }

    // 4. retrieve user
    const user = await this.userRepository.findOneById(tokenRecord.userId);
    if (!user) throw new BadRequestException('User not found');

    // 5. update password
    user.password = await bcrypt.hash(newPassword, 10);
    user.updatedAt = new Date();

    // 6. save user

    await this.userRepository.update(user);

    // 7. invalidate token
    await this.tokenRepository.deleteById(tokenRecord.id);
  }
}
