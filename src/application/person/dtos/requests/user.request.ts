import { PersonRequestDto } from './person.request';

export abstract class UserRequestDto extends PersonRequestDto {
  public email: String;
  public mobileNumber: String;
  public password: String;

  constructor(
    firstname: String,
    lastname: String,
    birthdate: String,
    email: String,
    mobileNumber: String,
    password: String,
  ) {
    super(firstname, lastname, birthdate);
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.password = password;
  }
}
