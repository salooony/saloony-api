import { ApiProperty } from '@nestjs/swagger';
import { UserRequestDto } from './user.request';
import { LocationRequestDto } from '@application/location/dtos/requests/location.request.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerRequestDto extends UserRequestDto {
  @ApiProperty({
    description: 'The location of the customer',
    type: LocationRequestDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationRequestDto)
  public location: LocationRequestDto;

  constructor(
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    mobileNumber: string,
    password: string,
    location: LocationRequestDto,
    language: string,
  ) {
    super(firstname, lastname, birthdate, email, mobileNumber, password, language);
    this.location = location;
  }
}
