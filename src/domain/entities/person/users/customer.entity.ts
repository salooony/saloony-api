import { Roles } from '@domain/enums/roles.enum';
import { User } from './user.entity';

export class Customer extends User {
  public calendarURL: string;

  public getRole() {
    return Roles.CUSTOMER;
  }
}
