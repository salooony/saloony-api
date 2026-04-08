import { Module } from '@nestjs/common';
import { TemplateModule } from './template.module';
import { NotifierService } from '../../application/services/notifier.service';
import { SmsChannel } from '../channels/sms.channel';
import { EmailChannel } from '../channels/email.channel';

@Module({
  imports: [TemplateModule],
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
  exports: [TemplateModule, NotifierService],
})
export class NotificationModule {}
