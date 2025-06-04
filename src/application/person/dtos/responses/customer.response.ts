import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { UserResponseDto } from './user.response';
import { ApiProperty } from '@nestjs/swagger';
import { LocationResponseDto } from '@application/location/dtos/response/location.response.dto';

export class CustomerResponseDto extends UserResponseDto {
  @ApiProperty({
    description: 'The URL of the calendar',
    type: String,
    example: 'https/saloony.ts/images/31553',
  })
  public calendarURL: string;

  @ApiProperty({
    description: 'The stored location',
    type: LocationResponseDto,
  })
  public location: LocationResponseDto;

  private constructor(
    id: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    imageURL: string,
    email: string,
    mobileNumber: string,
    joinDate: Date,
    language: string,
  ) {
    super(id, firstname, lastname, birthdate, imageURL, email, mobileNumber, joinDate, language);
  }

  static createFromEntity(customer: Customer): CustomerResponseDto {
    const customerResponse = new CustomerResponseDto(
      customer.id,
      customer.firstname,
      customer.lastname,
      customer.birthdate,
      customer.imageURL,
      customer.email,
      customer.mobileNumber,
      customer.joinDate,
      customer.language,
    );

    customerResponse.calendarURL = customer.calendarURL;
    customerResponse.location = LocationResponseDto.createFromEntity(customer.location);

    return customerResponse;
  }
}
