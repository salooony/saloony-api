import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IEmailSender } from '../../domain/ports/iemailsender.repository';

@Injectable()
export class SmtpEmailSender implements IEmailSender {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetEmail(to: string, resetLink: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    });

    console.log(`Reset email sent to ${to}`);
  }
}
