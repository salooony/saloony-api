import { ApiProperty } from '@nestjs/swagger';
import { PersonResponseDto } from './person.response';

export abstract class UserResponseDto extends PersonResponseDto {
  @ApiProperty({
    description: 'The email address',
    type: String,
    example: 'example@email.com',
  })
  public email: string;

  @ApiProperty({
    description: 'The mobile number',
    type: String,
    example: '+2105495626',
  })
  public mobileNumber: string;

  @ApiProperty({
    description: 'The date at which the account was created',
    type: Date,
    example: '4/3/2026',
  })
  public joinDate: Date;

  constructor(
    id: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    imageURL: string,
    email: string,
    mobileNumber: string,
    joinDate: Date,
  ) {
    super(id, firstname, lastname, birthdate, imageURL);
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.joinDate = joinDate;
  }
}
