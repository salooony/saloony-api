import { Roles } from '../enums/roles.enum';

export class User {
  public id: string;
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
  public acl: string[] = [];
}
