import { SalonRole } from '@salon/domain/enums/salon-role.enum';

export class SalonMembership {
  id: string;
  userId: string;
  salonId: number;
  role: SalonRole;
  createdAt: Date;
}
