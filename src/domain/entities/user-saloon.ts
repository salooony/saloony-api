import { SaloonRoles } from '@domain/enums/saloon-roles.enum';
import { Saloon } from './saloon';

export class UserSaloon {
  saloon: Saloon;
  role: SaloonRoles;
}
