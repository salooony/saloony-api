import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EVENT_DISPATCHER } from './ports/event-dispatcher.interface';
import { EventDispatcher } from './providers/event-dispatcher.provider';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    {
      provide: EVENT_DISPATCHER,
      useClass: EventDispatcher,
    },
  ],
  exports: [{ provide: EVENT_DISPATCHER, useClass: EventDispatcher }],
})
export class EventDispatcherModule {}
