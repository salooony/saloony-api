import { SalonRole } from '..';

export class SalonMembership {
  id: string;
  userId: string;
  salonId: string;
  role: SalonRole;
  createdAt: Date;
}
