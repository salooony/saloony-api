import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { SALON_ROLES_KEY } from '../decorators/salon-roles.decorator';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { SalonRole } from '@saloon/domain/enums/salon-role.enum';
import { SalonMembershipEntity } from '@user/infrastructure/schemas/salon-membership.entity';
import { AppRequest } from '@app/shared/application/requests/app.request';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredSalonRoles = this.reflector.getAllAndOverride<SalonRole[]>(SALON_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no specific roles are required, allow access.
    // This assumes authentication is handled by a previous guard (e.g., TokenGuard).
    if (!requiredRoles && !requiredSalonRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AppRequest>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    // 1. Global Admin Bypass
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // 2. Check Global Roles
    if (requiredRoles) {
      if (requiredRoles.some((role) => user.role === role)) {
        return true;
      }
    }

    // 3. Check Salon Roles
    if (requiredSalonRoles) {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      const salonId = ((request.params as Record<string, unknown>)?.salonId ??
        (request.body as Record<string, unknown>)?.salonId ??
        (request.query as Record<string, unknown>)?.salonId) as string | undefined;
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */

      if (!salonId) {
        // We can't verify salon access without a salonId.
        return false;
      }

      // Check Membership directly from DB.
      // TODO: Add caching layer for performance.
      const membership = await this.dataSource.getRepository(SalonMembershipEntity).findOne({
        where: {
          userId: user.id,
          salonId: Number(salonId),
        },
      });

      if (membership && requiredSalonRoles.includes(membership.role)) {
        return true;
      }
    }

    return false;
  }
}
