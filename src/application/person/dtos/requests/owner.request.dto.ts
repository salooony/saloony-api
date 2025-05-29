import { UserRequestDto } from './user.request';

export class OwnerRequestDto extends UserRequestDto {
  constructor(
    firstname: String,
    lastname: String,
    birthdate: String,
    email: String,
    mobileNumber: String,
    password: String,
  ) {
    super(firstname, lastname, birthdate, email, mobileNumber, password);
  }
}
