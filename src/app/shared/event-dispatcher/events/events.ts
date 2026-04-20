import { Events as EventsEnum } from '../enums/events.enum';

// The mapper between each event name and its payload
export interface Events extends Record<EventsEnum, any> {
  [EventsEnum.USER_CREATED]: string; // this is only temporary to avoid errors
}
