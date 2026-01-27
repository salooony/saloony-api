import { SalonRole } from '@saloon/domain/enums/salon-role.enum';

export class SalonMembership {
  id: string;
  userId: string;
  salonId: number;
  role: SalonRole;
  createdAt: Date;
}
