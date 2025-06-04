import { Location } from './location.entity';

export class Shop {
  id: string;
  name: string;
  location: Location;
  joinDate: Date;
  description: string;
  // workingTime: Object<DayEnum: TimeRange>
  // employees: Array<Employee>
  // reservations: Array<Reservation>
  // services: Array<Service>
  // shopCalendar: Calendar
}
