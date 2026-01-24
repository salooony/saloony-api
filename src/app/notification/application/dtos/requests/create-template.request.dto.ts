import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';
import { TemplateType } from '../../../domain/enums/template-type.enum';

export class CreateTemplateRequestDto {
  @ApiProperty({
    description: 'The unique key of the template.',
    type: String,
    required: true,
    example: 'welcome_new_user',
  })
  @IsNotEmpty()
  @IsString()
  public key: string;

  @ApiProperty({
    description: 'The type of the template.',
    enum: TemplateType,
    required: true,
    example: TemplateType.SYSTEM,
  })
  @IsNotEmpty()
  @IsEnum(TemplateType)
  public type: TemplateType;

  @ApiProperty({
    description: 'The title of the notification template.',
    type: String,
    required: true,
    example: 'Welcome to Saloony!',
  })
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'The message content of the template with placeholders.',
    type: String,
    required: true,
    example: 'Hello {{name}}, welcome to our platform.',
  })
  @IsNotEmpty()
  @IsString()
  public message: string;

  @ApiProperty({
    description: 'Default values for placeholders.',
    type: Object,
    required: false,
    example: { name: 'User' },
  })
  @IsOptional()
  @IsObject()
  public defaultParameters?: Record<string, any>;

  @ApiProperty({
    description: 'Metadata for the template.',
    type: Object,
    required: false,
  })
  @IsOptional()
  @IsObject()
  public metadata?: Record<string, any>;

  constructor(
    key: string,
    type: TemplateType,
    title: string,
    message: string,
    defaultParameters?: Record<string, any>,
    metadata?: Record<string, any>,
  ) {
    this.key = key;
    this.type = type;
    this.title = title;
    this.message = message;
    this.defaultParameters = defaultParameters;
    this.metadata = metadata;
  }
}
