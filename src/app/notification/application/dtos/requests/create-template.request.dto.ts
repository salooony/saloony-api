import { NotificationType } from '@notification/domain/enums/notification-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsObject, IsEnum } from 'class-validator';

export class CreateTemplateRequestDto {
  @ApiProperty({
    description: 'The identifier key for the template. Used combined with type as a composite primary key.',
    type: String,
    required: true,
    example: 'verify_email',
  })
  @IsNotEmpty()
  @IsString()
  public key: string;

  @ApiProperty({
    description: 'The delivery channel type.',
    enum: NotificationType,
    required: true,
    example: NotificationType.EMAIL,
  })
  @IsNotEmpty()
  @IsEnum(NotificationType)
  public type: NotificationType;

  @ApiProperty({
    description: 'The title of the notification template.',
    type: String,
    required: true,
    example: 'Verify your Saloony email',
  })
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'The message content of the template with placeholders.',
    type: String,
    required: true,
    example: 'Hello {{firstName}}, use this verification code to verify your email address: {{code}}',
  })
  @IsNotEmpty()
  @IsString()
  public message: string;

  @ApiProperty({
    description: 'Default values for placeholders.',
    type: Object,
    required: false,
    example: { firstName: 'Guest', code: '000000' },
  })
  @IsOptional()
  @IsObject()
  public defaultParameters?: Record<string, any>;
}
