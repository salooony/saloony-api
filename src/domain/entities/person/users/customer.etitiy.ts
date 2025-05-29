import { Roles } from '@domain/enums/roles.enum';
import { User } from './user.entity';
import { Location } from '@domain/entities/location.entity';

export class Customer extends User {
  public calendarURL: String;
  public location: Location;

  public getRole() {
    return Roles.CUSTOMER;
  }
}
