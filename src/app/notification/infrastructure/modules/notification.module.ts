import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TemplateModule } from './template.module';
import { NotifierService } from '../../application/services/notifier.service';
import { SmsChannel } from '../channels/sms.channel';
import { EmailChannel } from '../channels/email.channel';

@Module({
  imports: [
    ConfigModule,
    TemplateModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          port: Number(configService.get<number>('EMAIL_PORT')) || 587,
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('EMAIL_USER'),
        },
      }),
    }),
  ],
  providers: [
    SmsChannel,
    EmailChannel,
    {
      provide: 'NOTIFIER_CHANNELS',
      useFactory: (sms: SmsChannel, email: EmailChannel) => [sms, email],
      inject: [SmsChannel, EmailChannel],
    },
    NotifierService,
  ],
  exports: [TemplateModule, MailerModule, NotifierService],
})
export class NotificationModule {}
