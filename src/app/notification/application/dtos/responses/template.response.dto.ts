import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';

export class TemplateResponseDto {
  @ApiProperty({
    description: 'The unique key of the template.',
    type: String,
    example: 'welcome_email',
  })
  public key: string;

  @ApiProperty({
    description: 'The type of the notification.',
    enum: NotificationType,
    example: NotificationType.EMAIL,
  })
  public type: NotificationType;

  @ApiProperty({
    description: 'The title of the notification template.',
    type: String,
    example: 'Verify your Saloony email',
  })
  public title: string;

  @ApiProperty({
    description: 'The message content of the template with placeholders.',
    type: String,
    example: 'Hello {{firstName}}, use this verification code: {{code}}',
  })
  public message: string;

  @ApiProperty({
    description: 'Default values for placeholders.',
    type: Object,
    example: { firstName: 'Guest', code: '000000' },
  })
  public defaultParameters: Record<string, any>;

  @ApiProperty({
    description: 'The date when the template was created.',
    type: Date,
    example: '2026-04-07T09:00:00.000Z',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'The date when the template was last updated.',
    type: Date,
    example: '2026-04-09T12:00:00.000Z',
  })
  public updatedAt?: Date;
}
