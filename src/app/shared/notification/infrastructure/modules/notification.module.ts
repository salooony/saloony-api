import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../schemas/notification.entity';
import { CreateNotificationUseCase } from '../../application/usecases/create-notification.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [CreateNotificationUseCase],
  exports: [CreateNotificationUseCase],
})
export class NotificationModule {}
