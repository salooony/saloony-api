import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsMobilePhone,
  IsStrongPassword,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Roles } from '@app/user/domain/enums/roles.enum';

export class UserRequestDto {
  @ApiProperty({
    description: 'The first name.',
    type: String,
    required: true,
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'The last name.',
    type: String,
    required: true,
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'The date of birth.',
    type: String,
    required: true,
    example: '4/3/2005',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  public birthdate: Date;

  @ApiProperty({
    description: 'The role of the user (could be for a client or saloon user).',
    type: String,
    required: true,
    example: 'Client',
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  public role: Roles;

  @ApiProperty({
    description: 'The email address.',
    type: String,
    required: true,
    example: 'example@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'The mobile number.',
    type: String,
    required: true,
    example: '002105495626',
  })
  @IsNotEmpty()
  @IsMobilePhone()
  public mobileNumber: string;

  @ApiProperty({
    description: 'The password for the account.',
    type: String,
    required: true,
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 7,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;

  @ApiProperty({
    description: 'The language the user chose to use the application.',
    type: String,
    required: true,
    example: 'French',
  })
  @IsNotEmpty()
  @IsString()
  public language: string;

  constructor(
    firstname: string,
    lastname: string,
    birthdate: Date,
    role: Roles,
    email: string,
    mobileNumber: string,
    password: string,
    language: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.role = role;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.password = password;
    this.language = language;
  }
}
