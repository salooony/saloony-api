import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CodeVerificationRequestDto {
  @ApiProperty({
    description: 'Email verification code (6-digit numeric code)',
    example: '123456',
    pattern: '^[0-9]{6}$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{6}$/)
  code: string;
}
