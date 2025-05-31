import { UserRequestDto } from './user.request';

export class OwnerRequestDto extends UserRequestDto {
  constructor(
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    mobileNumber: string,
    password: string,
  ) {
    super(firstname, lastname, birthdate, email, mobileNumber, password);
  }
}
