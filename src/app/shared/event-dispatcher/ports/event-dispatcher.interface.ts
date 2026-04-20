import { Events } from '../events/events';
import { Events as EventsEnum } from '../enums/events.enum';

export const EVENT_DISPATCHER = 'EventDispatcher';

export interface IEventDispatcher {
  dispatch(event: EventsEnum, payload: Events[EventsEnum]): boolean;
  dispatchAsync(event: EventsEnum, payload: Events[EventsEnum]): Promise<unknown>;
}
