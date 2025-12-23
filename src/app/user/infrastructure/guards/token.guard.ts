import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { AppRequest } from '@app/user/application/requests/app.request';
import { IS_PUBLIC_KEY } from '@app/user/application/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @Inject('UsersRepository') private readonly userRepository: IUserRepository,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Allow access if marked as public
    }

    const request = context.switchToHttp().getRequest<AppRequest>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('User should be logged in to perform this task.');
    }

    const payload = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('A valid token must be used.');
    }

    request.user = user;

    return true;
  }

  private extractTokenFromRequest(request: Request): string {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
