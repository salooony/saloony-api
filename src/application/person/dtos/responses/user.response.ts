import { PersonResponseDto } from './person.response';

export abstract class UserResponseDto extends PersonResponseDto {
  public email: String;
  public mobileNumber: String;
  public joinDate: Date;

  constructor(
    id: String,
    firstname: String,
    lastname: String,
    birthdate: String,
    imageURL: String,
    email: String,
    mobileNumber: String,
    joinDate: Date,
  ) {
    super(id, firstname, lastname, birthdate, imageURL);
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.joinDate = joinDate;
  }
}
