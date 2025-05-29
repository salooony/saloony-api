import { Shop } from '@domain/entities/shop.entity';
import { User } from './user.entity';
import { Roles } from '@domain/enums/roles.enum';

export class Owner extends User {
  public shops: Array<Shop>;

  public getRole() {
    return Roles.OWNER;
  }
}
