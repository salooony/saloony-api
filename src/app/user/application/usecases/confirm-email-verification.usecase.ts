import {
  BadRequestException,
  ConflictException,
  GoneException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfirmEmailVerificationResponseDto } from '@user/application/dtos/responses/confirm-email-verification.response.dto';
import { User } from '@user/domain/entities/user';
import { VerificationChannel } from '@app/user/domain/enums/verification-channel.enum';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { TokenPurpose } from '@token/domin/enums/token-purpose.enum';
import { ITokenRepository } from '@token/domin/ports/token.repository.interface';

@Injectable()
export class ConfirmEmailVerificationUseCase {
  private readonly logger = new Logger(ConfirmEmailVerificationUseCase.name);

  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ITokenRepository')
    private readonly tokenRepository: ITokenRepository,
  ) {}

  /**
   * Confirms email verification by validating the provided code.
   * DTO handles format validation, and this use case verifies ownership/expiry/single-use.
   */
  async execute(user: User, code: string): Promise<ConfirmEmailVerificationResponseDto> {
    if (user.isEmailVerified()) {
      throw new ConflictException('Email already verified');
    }

    const normalizedCode = code?.trim();
    if (!normalizedCode) {
      throw new BadRequestException('Verification code is required');
    }

    const tokenRecord = await this.tokenRepository.findByOwnerTokenAndType(
      user.id,
      normalizedCode,
      TokenPurpose.EMAIL_VERIFICATION,
    );

    if (!tokenRecord) {
      throw new NotFoundException('No active verification token found');
    }

    if (tokenRecord.expiredAt && new Date() > tokenRecord.expiredAt) {
      await this.tokenRepository.deleteById(tokenRecord.id);
      throw new GoneException('Verification code has expired');
    }

    // Single-use: invalidate token first, then apply state transition.
    await this.tokenRepository.deleteById(tokenRecord.id);

    user.verifyEmail();
    await this.userRepository.save(user);

    this.logger.log(`Email verified for user ${user.id}`);

    return {
      status: true,
      channel: VerificationChannel.EMAIL,
    };
  }
}
