import { Saloon } from '@domain/entities/saloon.entity';
import { Roles } from '@domain/enums/roles.enum';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';

export abstract class User {
  public id: number;
  public firstname: string;
  public lastname: string;
  public birthdate: Date;
  public email: string;
  public mobileNumber: string;
  public password?: string;
  public joinDate: Date;
  public language: string;
  public saloons: Array<{ saloon: Saloon; role: SaloonRoles }> = [];

  public abstract getRole(): Roles;
}
