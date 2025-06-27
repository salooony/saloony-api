import { Roles } from '@domain/enums/roles.enum';
import { User } from './user.entity';

export class Client extends User {
  public getRole() {
    return Roles.CLIENT;
  }
}
