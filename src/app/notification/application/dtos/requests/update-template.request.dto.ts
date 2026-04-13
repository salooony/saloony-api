import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateTemplateRequestDto {
  @ApiProperty({
    description: 'The title of the notification template.',
    type: String,
    required: false,
    example: 'Welcome to our platform',
  })
  @IsOptional()
  @IsString()
  public title?: string;

  @ApiProperty({
    description: 'The message content of the template.',
    type: String,
    required: false,
    example: 'Hello {{firstName}}, we are glad to have you!',
  })
  @IsOptional()
  @IsString()
  public message?: string;

  @ApiProperty({
    description: 'Default values for placeholders.',
    type: Object,
    required: false,
    example: { firstName: 'Guest' },
  })
  @IsOptional()
  @IsObject()
  public defaultParameters?: Record<string, any>;
}
