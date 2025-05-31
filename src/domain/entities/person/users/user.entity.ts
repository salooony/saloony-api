import { Roles } from '@domain/enums/roles.enum';
import { Person } from '../person.entity';

export abstract class User extends Person {
  public email: string;
  public mobileNumber: string;
  public password?: string;
  public joinDate: Date;

  public abstract getRole(): Roles;
}
