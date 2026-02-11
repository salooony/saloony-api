import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailVerificationResponseDto {
  @ApiProperty({ example: 'VERIFIED' })
  status: string;

  @ApiProperty({ example: 'EMAIL' })
  channel: string;
}
