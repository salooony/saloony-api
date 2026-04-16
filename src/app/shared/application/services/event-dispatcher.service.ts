import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventDispatcher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  dispatch<TPayload = unknown>(event: string, payload?: TPayload): boolean {
    return this.eventEmitter.emit(event, payload);
  }

  dispatchAsync<TPayload = unknown>(event: string, payload?: TPayload): Promise<unknown[]> {
    return this.eventEmitter.emitAsync(event, payload);
  }
}
