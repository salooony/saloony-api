import { ConflictException, Injectable } from '@nestjs/common';
import { NotifierService } from '@notification/application/services/notifier.service';
import { User } from '@user/domain/entities/user';
import { SmsMessage } from '@notification/domain/message/sms.message';

@Injectable()
export class RequestPhoneVerificationUseCase {
  constructor(private readonly notifierService: NotifierService) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(user: User): Promise<void> {
    // Ensure user has a phone number
    if (!user.mobileNumber) {
      throw new ConflictException('User does not have a phone number');
    }

    // If phone already verified → return 409 Conflict
    if (user.isPhoneVerified()) {
      throw new ConflictException('Phone already verified');
    }

    // TODO: Generate verification token using Token module (under development)
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // TODO: Persist token metadata if needed

    // Send notification via Notification.Notifier
    // Channel: PHONE (SMS)
    const message = new SmsMessage(user.mobileNumber, `Your verification code is: ${token}`);

    this.notifierService.notify(message);
  }
}
