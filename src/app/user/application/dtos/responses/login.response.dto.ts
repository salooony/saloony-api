import { ApiProperty } from '@nestjs/swagger';

import { Token } from '../../../domain/entities/token';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Access token to be used in frequent requests.',
    type: String,
    example: '',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token to be used when access token expires.',
    type: String,
    example: '',
  })
  refreshToken: string;

  private constructor() {}

  static createFromEntity(token: Token): LoginResponseDto {
    const dto = new LoginResponseDto();

    dto.accessToken = token.accessToken;
    dto.refreshToken = token.refreshToken;

    return dto;
  }
}
