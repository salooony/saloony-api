import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EVENT_DISPATCHER } from './ports/event-dispatcher.interface';
import { EventDispatcher } from './providers/event-dispatcher.provider';

/**
 * Event Dispatcher Module
 *
 * Carrys the event dispatcher provider and exports it
 * Carrys the event listeners
 */
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
