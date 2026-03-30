import { NOTIFICATION_TEMPLATE_KEYS } from '@app/notification/domain/enums/template-key.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateTemplateRequestDto {
  @ApiProperty({
    description: 'The unique key of the template.',
    type: String,
    required: true,
    example: NOTIFICATION_TEMPLATE_KEYS[0],
  })
  @IsNotEmpty()
  @IsString()
  public key: string;

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
