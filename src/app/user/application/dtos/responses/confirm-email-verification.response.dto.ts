import { ApiProperty } from '@nestjs/swagger';
import { VerificationStatus } from '@app/user/domain/enums/verification-status.enum';
import { VerificationChannel } from '@app/user/domain/enums/verification-channel.enum';

export class ConfirmEmailVerificationResponseDto {
  @ApiProperty({ enum: VerificationStatus, example: VerificationStatus.VERIFIED })
  status: VerificationStatus;

  @ApiProperty({ enum: VerificationChannel, example: VerificationChannel.EMAIL })
  channel: VerificationChannel;
}
