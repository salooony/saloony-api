import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailVerificationRequestDto {
  @ApiProperty({
    description: 'Email verification code',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
