import { ConflictException, Injectable } from '@nestjs/common';
import { NotifierService } from '@notification/application/services/notifier.service';
import { User } from '@user/domain/entities/user';

@Injectable()
export class RequestEmailVerificationUseCase {
  constructor(private readonly notifierService: NotifierService) {}

  execute(user: User): Promise<void> {
    if (user.isEmailVerified()) {
      throw new ConflictException('Email already verified');
    }

    // TODO: Generate verification token using Token module (under development)
    // const token = Math.floor(100000 + Math.random() * 900000).toString();

    // TODO: Send notification via Notification.Notifier
    // Channel: EMAIL
    // Template: verify_email
    // Payload: code (and optional TTL)

    // this.notifierService.notify({
    //   channel: 'EMAIL',
    //   template: 'verify_email',
    //   payload: { code: token }
    // });

    return Promise.resolve();
  }
}
