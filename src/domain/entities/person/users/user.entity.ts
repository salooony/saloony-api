import { Roles } from '@domain/enums/roles.enum';
import { Person } from '../person.entity';

export abstract class User extends Person {
  public email: String;
  public mobileNumber: String;
  public password?: String;
  public joinDate: Date;

  public abstract getRole(): Roles;
}
