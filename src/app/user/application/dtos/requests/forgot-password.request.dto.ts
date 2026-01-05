import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ForgotPasswordRequestDto {
  @ApiProperty({
    description: 'Email of the account to reset password.',
    type: String,
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
