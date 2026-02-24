import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailVerificationRequestDto {
  @ApiProperty({
    description: 'Email verification code (6-digit numeric code)',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: 'Verification code must be a string' })
  @IsNotEmpty({ message: 'Verification code is required' })
  @Length(6, 6, { message: 'Verification code must be exactly 6 characters' })
  @Matches(/^\d+$/, { message: 'Verification code must contain only digits' })
  code: string;
}
