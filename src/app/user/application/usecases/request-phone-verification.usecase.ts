import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { User } from '@user/domain/entities/user';
import { TokenGeneratorService } from '@token/application/token-generator.service';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';

@Injectable()
export class RequestPhoneVerificationUseCase {
  constructor(
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

    // Notification delivery is disabled while notifier integrations are removed.
    void messageContent;
  }
}
