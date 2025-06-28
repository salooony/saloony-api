import { Roles } from '@domain/enums/roles.enum';
import { UserSaloons } from './user_saloons';

export class User {
  public readonly id: number;
  public firstname: string;
  public lastname: string;
  public birthdate: Date;
  public role: Roles;
  public email: string;
  public mobileNumber: string;
  public password?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public language: string;
  public saloons: Array<UserSaloons> = [];

  public getRole(): Roles {
    return this.role;
  }
}
