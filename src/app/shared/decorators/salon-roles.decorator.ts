import { SetMetadata } from '@nestjs/common';

import { SalonRole } from '@user';

export const SALON_ROLES_KEY = 'salon_roles';
export const SalonRoles = (...roles: SalonRole[]) => SetMetadata(SALON_ROLES_KEY, roles);
