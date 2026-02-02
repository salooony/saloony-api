import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@user/domain/ports/iuser.repository';
import { UserStatus } from '@user/domain/enums/user-status.enum';
import { NotifierService } from '@notification/application/services/notifier.service';

@Injectable()
export class RequestEmailVerificationUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
    private readonly notifierService: NotifierService,
  ) {}

  async execute(userId: string): Promise<{ status: 'SENT'; channel: 'EMAIL' }> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (this.isEmailVerified(user.status)) {
      throw new ConflictException('Email already verified');
    }

    // TODO: Generate verification token using Token module (under development)
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // TODO: Send notification via Notification.Notifier
    // Channel: EMAIL
    // Template: verify_email
    // Payload: code (and optional TTL)

    // this.notifierService.notify({
    //   channel: 'EMAIL',
    //   template: 'verify_email',
    //   payload: { code: token }
    // });

    return { status: 'SENT', channel: 'EMAIL' };
  }

  private isEmailVerified(status: UserStatus): boolean {
    return [
      UserStatus.WAITING_PHONE_VERIFICATION,
      UserStatus.WAITING_OPERATOR_VALIDATION,
      UserStatus.ACTIVE,
      UserStatus.BLOCKED,
    ].includes(status);
  }
}
