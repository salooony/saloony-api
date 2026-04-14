import { NotificationType } from '@notification/domain/enums/notification-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class TemplateIdentifierDto {
  @ApiProperty({
    description: 'The identifier key for the template (e.g., verify_email). Used combined with type.',
    example: 'verify_email',
  })
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({
    description: 'The delivery channel type.',
    enum: NotificationType,
    example: NotificationType.EMAIL,
  })
  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;
}
