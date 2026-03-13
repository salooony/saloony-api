import { ApiProperty } from '@nestjs/swagger';
import { VerificationChannel } from '@app/user/domain/enums/verification-channel.enum';

export class CodeVerificationResponseDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ enum: VerificationChannel, example: VerificationChannel.EMAIL })
  channel: VerificationChannel;
}
