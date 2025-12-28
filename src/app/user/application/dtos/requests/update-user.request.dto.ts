import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsMobilePhone, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({
    description: 'The first name.',
    type: String,
    required: true,
    example: 'John',
  })
  @IsOptional()
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'The last name.',
    type: String,
    required: true,
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'The date of birth.',
    type: String,
    required: true,
    example: '4/3/2005',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public birthdate: Date;

  @ApiProperty({
    description: 'The email address.',
    type: String,
    required: true,
    example: 'example@email.com',
  })
  @IsOptional()
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'The mobile number.',
    type: String,
    required: true,
    example: '002105495626',
  })
  @IsOptional()
  @IsMobilePhone()
  public mobileNumber: string;

  @ApiProperty({
    description: 'The language the user chose to use the application.',
    type: String,
    required: true,
    example: 'French',
  })
  @IsOptional()
  @IsString()
  public language: string;

  constructor(
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    mobileNumber: string,
    language: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.language = language;
  }
}
