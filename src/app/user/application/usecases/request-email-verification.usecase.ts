import { ConflictException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { NotifierService } from '@notification/application/services/notifier.service';
import { User } from '@user/domain/entities/user';
import { TokenGeneratorService } from '@token/application/token-generator.service';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';
import { EmailMessage } from '@notification/domain/message/email.message';

@Injectable()
export class RequestEmailVerificationUseCase {
  private readonly logger = new Logger(RequestEmailVerificationUseCase.name);

  constructor(
    private readonly notifierService: NotifierService,
    private readonly tokenGeneratorService: TokenGeneratorService,
    private readonly getTemplateByKeyUseCase: GetTemplateByKeyUseCase,
  ) {}

  /**
   * Generates and sends an email verification code to the user
   * @param user - The user requesting email verification
   * @throws ConflictException - If email is already verified
   * @throws ServiceUnavailableException - If notification service unavailable
   */
  async execute(user: User): Promise<void> {
    // Check if email already verified
    if (user.isEmailVerified()) {
      throw new ConflictException('Email already verified');
    }

    try {
      // Generate 6-digit verification token using Token module
      const verificationCode = this.tokenGeneratorService.generate(TokenGeneratorType.NUMBER, { digits: 6 });

      // TODO: Store verification token in database using Token repository (token storage service under development)
      // const tokenRecord = await this.tokenRepository.create({
      //   userId: user.id,
      //   token: verificationCode,
      //   type: 'EMAIL_VERIFICATION',
      //   expiresIn: 15 * 60 * 1000, // 15 minutes
      // });

      // Fetch email template
      const template = await this.getTemplateByKeyUseCase.execute('email_verification');

      // Hydrate template with verification code
      const messageContent = template.message
        .replace('{{code}}', verificationCode)
        .replace('{{firstName}}', user.firstname);

      // Send verification email
      const message = new EmailMessage(user.email, 'Email Verification', messageContent);
      this.notifierService.notify(message);

      this.logger.log(`Email verification code sent to ${user.email}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to send email verification: ${errorMessage}`, errorStack);
      throw new ServiceUnavailableException('Failed to send verification email. Please try again later.');
    }
  }
}
