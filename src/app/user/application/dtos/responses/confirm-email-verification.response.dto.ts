import { ApiProperty } from '@nestjs/swagger';
import { VerificationChannel } from '@app/user/domain/enums/verification-channel.enum';

export class ConfirmEmailVerificationResponseDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ enum: VerificationChannel, example: VerificationChannel.EMAIL })
  channel: VerificationChannel;
}
