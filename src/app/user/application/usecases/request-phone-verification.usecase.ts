import { ConflictException, Injectable } from '@nestjs/common';
import { NotifierService } from '@notification/application/services/notifier.service';
import { User } from '@user/domain/entities/user';

@Injectable()
export class RequestPhoneVerificationUseCase {
  constructor(private readonly notifierService: NotifierService) {}

  execute(user: User): Promise<void> {
    // Ensure user has a phone number
    if (!user.mobileNumber) {
      throw new ConflictException('User does not have a phone number');
    }

    // If phone already verified → return 409 Conflict
    if (user.isPhoneVerified()) {
      throw new ConflictException('Phone already verified');
    }

    // TODO: Generate verification token using Token module (under development)
    // const token = Math.floor(100000 + Math.random() * 900000).toString();

    // TODO: Persist token metadata if needed

    // TODO: Send notification via Notification.Notifier
    // Channel: PHONE (SMS)
    // Template: verify_phone
    // Payload includes: code (and optional TTL)

    // this.notifierService.notify({
    //   channel: 'PHONE',
    //   template: 'verify_phone',
    //   payload: { code: token }
    // });

    return Promise.resolve();
  }
}
