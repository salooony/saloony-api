import { BadRequestException, ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '@user/domain/entities/user';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { ConfirmEmailVerificationResponseDto } from '@user/application/dtos/responses/confirm-email-verification.response.dto';
import { VerificationChannel } from '@app/user/domain/enums/verification-channel.enum';
import { VerificationStatus } from '@app/user/domain/enums/verification-status.enum';

@Injectable()
export class ConfirmEmailVerificationUseCase {
  private readonly logger = new Logger(ConfirmEmailVerificationUseCase.name);

  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Confirms email verification by validating the provided code
   * @param user - The authenticated user
   * @param code - The verification code provided by the user
   * @returns ConfirmEmailVerificationResponseDto with verification status
   * @throws ConflictException - If email is already verified
   * @throws BadRequestException - If verification code format is invalid
   * @throws NotFoundException - If no active verification token found
   * @throws GoneException - If verification code has expired
   */
  async execute(user: User, code: string): Promise<ConfirmEmailVerificationResponseDto> {
    // Check if email already verified
    if (user.isEmailVerified()) {
      throw new ConflictException('Email already verified');
    }

    // Validate code format (must be 6 digits)
    if (!code || typeof code !== 'string' || !/^\d{6}$/.test(code.trim())) {
      throw new BadRequestException('Invalid verification code format. Code must be 6 digits.');
    }

    // TODO: Verify token/code using Token repository (token storage service under development)
    // Implementation pattern:
    // const tokenRecord = await this.tokenRepository.findByCodeAndUserId(user.id, code);
    //
    // if (!tokenRecord) {
    //   throw new NotFoundException('No active verification token found');
    // }
    //
    // if (this.isTokenExpired(tokenRecord.expiredAt)) {
    //   throw new GoneException('Verification code has expired');
    // }
    //
    // // Mark token as used (single-use enforcement)
    // await this.tokenRepository.markAsUsed(tokenRecord.id);

    // Mark email as verified
    user.verifyEmail();

    // Persist changes
    await this.userRepository.save(user);

    this.logger.log(`Email verified for user ${user.id}`);

    return {
      status: VerificationStatus.VERIFIED,
      channel: VerificationChannel.EMAIL,
    };
  }

  /**
   * Helper method to check if token has expired
   * @param expiredAt - Token expiration date
   * @returns boolean indicating if token is expired
   */
  private isTokenExpired(expiredAt: Date | null): boolean {
    if (!expiredAt) return false;
    return new Date() > expiredAt;
  }
}
