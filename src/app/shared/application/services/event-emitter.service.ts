import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SharedEventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit<TPayload = unknown>(event: string, payload?: TPayload): boolean {
    return this.eventEmitter.emit(event, payload);
  }

  emitAsync<TPayload = unknown>(event: string, payload?: TPayload): Promise<unknown[]> {
    return this.eventEmitter.emitAsync(event, payload);
  }
}
