import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

type ResetPasswordCommand = { token: string; newPassword: string };

@Injectable()
export class ResetPasswordUsecase {
  constructor() {
    // @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
    // @Inject('PasswordResetTokensRepository') private readonly tokenRepository: IPasswordResetTokensRepository,
  }

  async execute({ token, newPassword }: ResetPasswordCommand): Promise<void> {
    // 1. hash the token (because DB stores hash)
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    await Promise.resolve(console.log(newPassword, tokenHash));

    // 2. find token entity
    // const tokenRecord = await this.tokenRepository.findByTokenHash(tokenHash);
    // if (!tokenRecord) throw new BadRequestException('Invalid or expired token');

    // // 3. check expiry
    // if (tokenRecord.expiresAt < new Date()) {
    //   throw new BadRequestException('Token expired');
    // }

    // 4. retrieve user
    // const user = await this.userRepository.findOneById(tokenRecord.userId);
    // if (!user) throw new BadRequestException('User not found');

    // // 5. update password
    // user.password = await bcrypt.hash(newPassword, 10);
    // user.updatedAt = new Date();

    // // 6. save user

    // await this.userRepository.updateOne(user);

    // // 7. invalidate token
    // await this.tokenRepository.deleteById(tokenRecord.id);
  }
}
