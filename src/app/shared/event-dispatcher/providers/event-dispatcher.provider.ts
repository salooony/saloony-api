import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventDispatcher } from '../ports/event-dispatcher.interface';
import { Events } from '../events/events';
import { Events as EventsEnum } from '../enums/events.enum';

@Injectable()
export class EventDispatcher implements IEventDispatcher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  dispatch(event: EventsEnum, payload: Events[EventsEnum]): boolean {
    return this.eventEmitter.emit(event, payload);
  }

  dispatchAsync<EventsEnum extends keyof Events>(event: EventsEnum, payload: Events[EventsEnum]): Promise<unknown> {
    return this.eventEmitter.emitAsync(event, payload);
  }
}
