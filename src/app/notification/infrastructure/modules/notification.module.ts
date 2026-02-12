import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifierService } from '../../application/services/notifier.service';
import { CreateTemplateUseCase } from '../../application/usecase/create-template.usecase';
import { GetTemplateByKeyUseCase } from '../../application/usecase/get-template-by-key.usecase';
import { SmsChannel } from '../channels/sms.channel';
import { EmailChannel } from '../channels/email.channel';
import { WhatsAppWebChannel } from '../channels/whatsapp-web.channel';
import { TemplateRepository } from '../repositories/template.repository';
import { Template } from '../schemas/template.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: Number(configService.get<string>('SMTP_PORT') ?? 587),
          secure: configService.get<boolean>('SMTP_SECURE'),
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: configService.get<string>('EMAIL_FROM') ?? configService.get<string>('SMTP_USER'),
        },
      }),
    }),
  ],
  providers: [
    TemplateRepository,
    {
      provide: 'ITemplateRepository',
      useClass: TemplateRepository,
    },
    CreateTemplateUseCase,
    GetTemplateByKeyUseCase,
    SmsChannel,
    EmailChannel,
    WhatsAppWebChannel,
    {
      provide: 'NOTIFIER_CHANNELS',
      useFactory: (configService: ConfigService, wa: WhatsAppWebChannel, sms: SmsChannel, email: EmailChannel) => {
        const nodeEnvRaw = configService.get<string>('NODE_ENV') ?? process.env.NODE_ENV ?? '';
        const nodeEnv = nodeEnvRaw.trim().toLowerCase();

        const waEnabledRaw = configService.get<string>('WA_WEB_ENABLED');
        const waEnabled = !!waEnabledRaw && ['true', '1', 'yes', 'on'].includes(waEnabledRaw.trim().toLowerCase());
        const isDevOrTest = nodeEnv === 'development' || nodeEnv === 'test' || !nodeEnv;
        const allowWa = waEnabled && isDevOrTest && nodeEnv !== 'production';

        // WhatsApp channel must be before SmsChannel because SmsChannel supports all SmsMessage.
        return allowWa ? [wa, sms, email] : [sms, email];
      },
      inject: [ConfigService, WhatsAppWebChannel, SmsChannel, EmailChannel],
    },
    NotifierService,
  ],
  exports: [CreateTemplateUseCase, GetTemplateByKeyUseCase, NotifierService],
})
export class NotificationModule {}
