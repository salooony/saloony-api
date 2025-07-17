import { Roles } from '@domain/enums/roles.enum';
import { UserSaloon } from './user-saloon';

export class User {
  public id: number;
  public firstname: string;
  public lastname: string;
  public avatar: string;
  public birthdate: Date;
  public role: Roles;
  public email: string;
  public mobileNumber: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
  public language: string;
  public saloons: UserSaloon[] = [];
}
