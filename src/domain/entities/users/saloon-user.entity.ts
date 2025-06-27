import { User } from './user.entity';
import { Roles } from '@domain/enums/roles.enum';

export class SaloonUser extends User {
  public getRole() {
    return Roles.SALOON_USER;
  }
}
