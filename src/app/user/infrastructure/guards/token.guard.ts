import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

import { AppRequest } from '@shared/application/requests/app.request';
import { JwtPayload } from '@shared/application/auth/jwt-payload.type';

import { USERS_REPOSITORY, IUserRepository, UserStatus } from '../../domain';
import { IS_PUBLIC_KEY } from '../../application';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AppRequest>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('User should be logged in to perform this task.');
    }

    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    const user = await this.userRepository.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('A valid token must be used.');
    }

    if (user.status === UserStatus.BLOCKED) {
      throw new UnauthorizedException('Your account has been blocked. Please contact support.');
    }

    request.user = user;

    return true;
  }

  private extractTokenFromRequest(request: AppRequest): string | undefined {
    const [, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
