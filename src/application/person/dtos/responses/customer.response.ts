import { Customer } from '@domain/entities/person/users/customer.etitiy';
import { UserResponseDto } from './user.response';

export class CustomerResponseDto extends UserResponseDto {
  public calendarURL: String;
  public location: String;

  private constructor(
    id: String,
    firstname: String,
    lastname: String,
    birthdate: String,
    imageURL: String,
    email: String,
    mobileNumber: String,
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
