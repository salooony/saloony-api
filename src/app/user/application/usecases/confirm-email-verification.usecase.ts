import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { User } from '@user/domain/entities/user';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { ConfirmEmailVerificationResponseDto } from '@user/application/dtos/responses/confirm-email-verification.response.dto';

@Injectable()
export class ConfirmEmailVerificationUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: User, _code: string): Promise<ConfirmEmailVerificationResponseDto> {
    // Check if email already verified
    if (user.isEmailVerified()) {
      throw new ConflictException('Email already verified');
    }

    // TODO: Verify token/code using Token module (under development)
    // const isValid = await this.tokenService.verify({
    //   userId: user.id,
    //   code: code,
    //   type: 'EMAIL_VERIFICATION'
    // });
    //
    // if (!isValid) {
    //   throw new BadRequestException('Invalid verification code format');
    // }
    //
    // if (tokenExpired) {
    //   throw new GoneException('Verification code has expired');
    // }
    //
    // if (tokenNotFound) {
    //   throw new NotFoundException('No active verification token found');
    // }

    // Mark email as verified
    user.verifyEmail();

    // Persist changes
    await this.userRepository.save(user);

    return {
      status: 'VERIFIED',
      channel: 'EMAIL',
    };
  }
}
