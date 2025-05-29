import { UserRequestDto } from './user.request';

export class CustomerRequestDto extends UserRequestDto {
  public location: String; // fix location

  constructor(
    firstname: String,
    lastname: String,
    birthdate: String,
    email: String,
    mobileNumber: String,
    password: String,
    locatoin: String,
  ) {
    super(firstname, lastname, birthdate, email, mobileNumber, password);
    this.location = locatoin;
  }
}
