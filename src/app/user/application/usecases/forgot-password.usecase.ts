import { Injectable, Inject } from '@nestjs/common';
import * as crypto from 'crypto';
import { ForgotPasswordRequestDto } from '../dtos/requests/forgot-password.request.dto';
import { PasswordResetToken } from '../../domain/entities/password-reset-token';
import { IUserRepository } from '../../domain/ports/iuser.repository';
import { IPasswordResetTokenRepository } from '../../domain/ports/ipassword-reset-token.repository';
import { IEmailSender } from '../../domain/ports/iemailsender.repository';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,

    @Inject('PasswordResetTokenRepository')
    private readonly passwordResetTokenRepository: IPasswordResetTokenRepository,

    @Inject('IEmailSender')
    private readonly emailSender: IEmailSender,
  ) {}
  //1. retrieve user by email
  async execute(forgotPasswordRequest: ForgotPasswordRequestDto): Promise<void> {
    const email = forgotPasswordRequest.email.toLowerCase().trim();
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) return;

    //2. generate a unique token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    //3. create a password reset token entity
    const tokenEntity = new PasswordResetToken({
      userId: user.id,
      tokenHash: tokenHash,
      expiresAt: new Date(Date.now() + 900000),
    });

    //4. store the token in the database
    await this.passwordResetTokenRepository.create(tokenEntity);

    //5. send password reset email
    const resetLink = `https://yourapp.com/reset-password?token=${encodeURIComponent(token)}`;
    await this.emailSender.sendResetEmail(user.email, resetLink);
    console.log('RESET LINK:', resetLink);
  }
}
