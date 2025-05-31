import { ApiProperty } from '@nestjs/swagger';
import { UserRequestDto } from './user.request';
// import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerRequestDto extends UserRequestDto {
  @ApiProperty({
    description: 'The location of the customer',
    type: String,
    example: '',
  })
  // @IsNotEmpty()
  // @IsString()
  public location: string; // fix location

  constructor(
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    mobileNumber: string,
    password: string,
    locatoin: string,
  ) {
    super(firstname, lastname, birthdate, email, mobileNumber, password);
    this.location = locatoin;
  }
}
