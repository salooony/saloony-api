import { User } from './user.entity';
import { Roles } from '@domain/enums/roles.enum';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';
import { Saloon } from '@domain/entities/saloon.entity';

export class SaloonUser extends User {
  public saloons: Array<{ saloon: Saloon; role: SaloonRoles }>;

  public getRole() {
    return Roles.SALOON_USER;
  }
}
