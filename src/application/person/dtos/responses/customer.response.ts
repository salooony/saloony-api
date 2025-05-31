import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { UserResponseDto } from './user.response';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto extends UserResponseDto {
  @ApiProperty({
    description: 'The URL of the calendar',
    type: String,
    example: '',
  })
  public calendarURL: string;

  @ApiProperty({
    description: 'The location of the customer',
    type: String,
    example: '',
  })
  public location: string;

  private constructor(
    id: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    imageURL: string,
    email: string,
    mobileNumber: string,
    joinDate: Date,
  ) {
    super(
      id,
      firstname,
      lastname,
      birthdate,
      imageURL,
      email,
      mobileNumber,
      joinDate,
    );
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
    );

    customerResponse.calendarURL = customer.calendarURL;
    customerResponse.location = customer.location.toString();

    return customerResponse;
  }
}
