import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordRequestDTO {
  @ApiProperty({ minLength: 8, example: 'NewStrongP@ssw0rd' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
