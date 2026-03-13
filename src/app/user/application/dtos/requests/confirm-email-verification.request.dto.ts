import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailVerificationRequestDto {
  @ApiProperty({
    description: 'Email verification code (6-digit numeric code)',
    example: '123456',
    pattern: '^[0-9]{6}$',
  })
  @IsString({ message: 'Verification code must be a string' })
  @IsNotEmpty({ message: 'Verification code is required' })
  @Matches(/^\d{6}$/, { message: 'Verification code must be exactly 6 digits' })
  code: string;
}
