import { ApiProperty } from '@nestjs/swagger';
import { PersonRequestDto } from './person.request';
// import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export abstract class UserRequestDto extends PersonRequestDto {
  @ApiProperty({
    description: 'The email address',
    type: String,
    required: true,
    example: 'example@email.com',
  })
  // @IsNotEmpty()
  // @IsString()
  // @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'The mobile number',
    type: String,
    required: true,
    example: '+2105495626',
  })
  // @IsNotEmpty()
  // @IsString()
  public mobileNumber: string;

  @ApiProperty({
    description: 'The password for the account',
    type: String,
    required: true,
    example: 'p@ssword',
  })
  // @IsNotEmpty()
  // @IsString()
  public password: string;

  constructor(
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    mobileNumber: string,
    password: string,
  ) {
    super(firstname, lastname, birthdate);
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.password = password;
  }
}
