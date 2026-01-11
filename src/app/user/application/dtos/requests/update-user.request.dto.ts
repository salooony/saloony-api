import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsMobilePhone, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({
    description: 'The first name.',
    type: String,
    required: false,
    example: 'John',
  })
  @IsOptional()
  @IsString()
  public firstname?: string;

  @ApiProperty({
    description: 'The last name.',
    type: String,
    required: false,
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  public lastname?: string;

  @ApiProperty({
    description: 'The date of birth.',
    type: Date,
    required: false,
    example: '4/3/2005',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public birthdate?: Date;

  @ApiProperty({
    description: 'The email address.',
    type: String,
    required: false,
    example: 'example@email.com',
  })
  @IsOptional()
  @IsEmail()
  public email?: string;

  @ApiProperty({
    description: 'The mobile number.',
    type: String,
    required: false,
    example: '002105495626',
  })
  @IsOptional()
  @IsMobilePhone()
  public mobileNumber?: string;

  @ApiProperty({
    description: 'The language the user chose to use the application.',
    type: String,
    required: false,
    example: 'French',
  })
  @IsOptional()
  @IsString()
  public language?: string;
}
