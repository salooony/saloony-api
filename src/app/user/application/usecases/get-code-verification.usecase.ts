import { ConflictException, Inject, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';
import { NotifierService } from '@notification/application/services/notifier.service';
import { TemplateKey } from '@notification/domain/enums/template-key.enum';
import { EmailMessage } from '@notification/domain/message/email.message';
import { TokenGeneratorService } from '@token/application/token-generator.service';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';
import { TokenPurpose } from '@token/domin/enums/token-purpose.enum';
import { ITokenRepository } from '@token/domin/ports/token.repository.interface';
import { User } from '@user/domain/entities/user';

@Injectable()
export class GetCodeVerificationUseCase {
  private readonly logger = new Logger(GetCodeVerificationUseCase.name);

  constructor(
    private readonly notifierService: NotifierService,
    private readonly tokenGeneratorService: TokenGeneratorService,
    private readonly getTemplateByKeyUseCase: GetTemplateByKeyUseCase,
    private readonly configService: ConfigService,
    @Inject('ITokenRepository')
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(user: User): Promise<void> {
    if (user.isEmailVerified()) {
      throw new ConflictException('Email already verified');
    }

    try {
      const verificationCode = this.tokenGeneratorService.generate(TokenGeneratorType.NUMBER, { digits: 6 });
      const ttlMs = Number(this.configService.get<string>('EMAIL_VERIFICATION_TOKEN_TTL_MS') ?? '900000');

      // Keep only one active email verification token per user.
      await this.tokenRepository.deleteByOwnerAndType(user.id, TokenPurpose.EMAIL_VERIFICATION);
      await this.tokenRepository.create({
        ownerId: user.id,
        token: verificationCode,
        isHashed: false,
        expiredAt: new Date(Date.now() + ttlMs),
        type: TokenPurpose.EMAIL_VERIFICATION,
      });

      const template = await this.getTemplateByKeyUseCase.execute(TemplateKey.EMAIL_VERIFICATION);
      const messageContent = template.message
        .replace('{{code}}', verificationCode)
        .replace('{{firstName}}', user.firstname);

      const message = new EmailMessage(user.email, 'Email Verification', messageContent);
      await this.notifierService.notify(message);

      this.logger.log(`Email verification code sent to ${user.email}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to send email verification: ${errorMessage}`, errorStack);
      throw new ServiceUnavailableException('Failed to send verification email. Please try again later.');
    }
  }
}
