import { Token } from '@app/user/domain/entities/token.entity';
import { User } from '@app/user/domain/entities/user.entity';
import { ITokenGenerator } from '@app/user/domain/ports/itoken-generator.provider';
import jwtConfig from '@config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenGenerator implements ITokenGenerator {
  constructor(
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  // generates access token and refresh token
  async generateTokens(user: User): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.generateToken(user.id, this.jwtConfiguration.accessTokenTtl, {
        email: user.email,
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
