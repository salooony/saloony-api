import { Client } from '@domain/entities/users/client.entity';
import { SaloonUser } from '@domain/entities/users/saloon-user.entity';
import { User } from '@domain/entities/users/user.entity';
import { Roles } from '@domain/enums/roles.enum';

export class UserFactory {
  private constructor() {}

  static create(role: Roles): User {
    switch (role) {
      case Roles.CLIENT:
        return new Client();
      case Roles.SALOON_USER:
        return new SaloonUser();
    }
  }
}
