import { UserRequestDto } from './user.request';

export class CustomerRequestDto extends UserRequestDto {
  constructor(
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    mobileNumber: string,
    password: string,
    language: string,
  ) {
    super(firstname, lastname, birthdate, email, mobileNumber, password, language);
  }
}
