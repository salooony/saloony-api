import { ApiProperty } from '@nestjs/swagger';
import { PersonRequestDto } from './person.request';
import { IsNotEmpty, IsString, IsEmail, IsMobilePhone, IsStrongPassword } from 'class-validator';

export abstract class UserRequestDto extends PersonRequestDto {
  @ApiProperty({
    description: 'The email address',
    type: String,
    required: true,
    example: 'example@email.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'The mobile number',
    type: String,
    required: true,
    example: '002105495626',
  })
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone()
  public mobileNumber: string;

  @ApiProperty({
    description: 'The password for the account',
    type: String,
    required: true,
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 7,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;

  @ApiProperty({
    description: 'The language the user chose to use the application',
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
    email: string,
    mobileNumber: string,
    password: string,
    language: string,
  ) {
    super(firstname, lastname, birthdate);
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.password = password;
    this.language = language;
  }
}
