import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequestDTO {
  @ApiProperty({
    description: 'Reset token received via email',
    example: '3abf94d0a1...',
  })
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'New password to set',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
