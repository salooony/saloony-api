import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '@config/jwt.config';

import { User, Token, ITokenGenerator } from '../../domain';

@Injectable()
export class TokenGenerator implements ITokenGenerator {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private jwtService: JwtService,
  ) {}

  // generates access token and refresh token
  async generateTokens(user: User): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.generateToken(user.id, this.jwtConfiguration.accessTokenTtl, {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        mobileNumber: user.mobileNumber,
      }),
      await this.generateToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return { accessToken, refreshToken };
  }

  // generates token
  private async generateToken<T>(sub: string, expiresIn: number, payload?: T): Promise<string> {
    return await this.jwtService.signAsync({ sub: sub, ...payload }, { expiresIn: expiresIn });
  }
}
