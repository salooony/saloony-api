import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';
import { NotifierService } from '@notification/application/services/notifier.service';
import { User } from '@user/domain/entities/user';
import { SmsMessage } from '@notification/domain/message/sms.message';
import { TokenGeneratorService } from '@token/application/token-generator.service';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';

@Injectable()
export class RequestPhoneVerificationUseCase {
  private readonly logger = new Logger(RequestPhoneVerificationUseCase.name);

  constructor(
    private readonly notifierService: NotifierService,
    private readonly tokenGeneratorService: TokenGeneratorService,
    private readonly getTemplateByKeyUseCase: GetTemplateByKeyUseCase,
  ) {}

  async execute(user: User): Promise<void> {
    // Ensure user has a phone number
    if (!user.mobileNumber) {
      throw new BadRequestException('User does not have a phone number');
    }

    // If phone already verified → return 409 Conflict
    if (user.isPhoneVerified()) {
      throw new ConflictException('Phone already verified');
    }

    // Generate verification token using Token module
    const token = this.tokenGeneratorService.generate(TokenGeneratorType.NUMBER, { digits: 6 });

    // Fetch SMS template
    const template = await this.getTemplateByKeyUseCase.execute('phone_verification');

    // Hydrate template message with token
    const messageContent = template.message.replace('{{code}}', token);

    // Send notification via Notification.Notifier
    // Channel: PHONE (SMS)
    const message = new SmsMessage(user.mobileNumber, messageContent);

    this.notifierService.notify(message);
    this.logger.log(`Phone verification SMS sent to ${user.mobileNumber}`);
  }
}
