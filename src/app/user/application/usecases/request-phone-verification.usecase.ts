import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';
import { NotifierService } from '@notification/application/services/notifier.service';
import { TemplateKey } from '@notification/domain/enums/template-key.enum';
import { SmsMessage } from '@notification/domain/message/sms.message';
import { TokenGeneratorService } from '@token/application/token-generator.service';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';
import { User } from '@user/domain/entities/user';

@Injectable()
export class RequestPhoneVerificationUseCase {
  private readonly logger = new Logger(RequestPhoneVerificationUseCase.name);

  constructor(
    private readonly notifierService: NotifierService,
    private readonly tokenGeneratorService: TokenGeneratorService,
    private readonly getTemplateByKeyUseCase: GetTemplateByKeyUseCase,
  ) {}

  async execute(user: User): Promise<void> {
    if (!user.mobileNumber) {
      throw new BadRequestException('User does not have a phone number');
    }

    if (user.isPhoneVerified()) {
      throw new ConflictException('Phone already verified');
    }

    try {
      const token = this.tokenGeneratorService.generate(TokenGeneratorType.NUMBER, { digits: 6 });
      const template = await this.getTemplateByKeyUseCase.execute(TemplateKey.PHONE_VERIFICATION);
      const messageContent = template.message.replace('{{code}}', token);

      const message = new SmsMessage(user.mobileNumber, messageContent);
      await this.notifierService.notify(message);

      this.logger.log(`Phone verification SMS sent to ${user.mobileNumber}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to send phone verification SMS: ${errorMessage}`, errorStack);
      throw new ServiceUnavailableException('Failed to send verification SMS. Please try again later.');
    }
  }
}
