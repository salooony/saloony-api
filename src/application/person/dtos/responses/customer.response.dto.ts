import { Customer } from '@domain/entities/person/users/customer.entity';
import { UserResponseDto } from './user.response';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto extends UserResponseDto {
  @ApiProperty({
    description: 'The URL of the calendar',
    type: String,
    example: 'https://saloony.tn/images/31553',
  })
  public calendarURL: string;

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

    return customerResponse;
  }
}
