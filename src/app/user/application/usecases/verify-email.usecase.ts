import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CodeVerificationResponseDto } from '@user/application/dtos/responses/code-verification.response.dto';
import { User } from '@user/domain/entities/user';
import { IUserRepository } from '@user/domain/ports/iuser.repository';
import { VerificationChannel } from '@user/domain/enums/verification-channel.enum';
import { TokenPurpose } from '@token/domin/enums/token-purpose.enum';
import { ITokenRepository } from '@token/domin/ports/token.repository.interface';

@Injectable()
export class VerifyEmailUseCase {
  private readonly logger = new Logger(VerifyEmailUseCase.name);

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
  async execute(user: User, code: string): Promise<CodeVerificationResponseDto> {
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
      throw new UnauthorizedException('Invalid verification code');
    }

    if (tokenRecord.expiredAt && new Date() > tokenRecord.expiredAt) {
      await this.tokenRepository.deleteById(tokenRecord.id);
      throw new UnauthorizedException('Invalid verification code');
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
