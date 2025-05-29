import { Customer } from '@domain/entities/person/users/customer.etitiy';
import { Owner } from '@domain/entities/person/users/owner.entity';
import { Roles } from '@domain/enums/roles.enum';

export default class UserFactory {
  static create(role: Roles) {
    switch (role) {
      case Roles.CUSTOMER:
        return new Customer();
      case Roles.OWNER:
        return new Owner();
    }
  }
}
