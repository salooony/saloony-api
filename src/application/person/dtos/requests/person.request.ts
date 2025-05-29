export abstract class PersonRequestDto {
  public firstname: String;
  public lastname: String;
  public birthdate: String;

  constructor(firstname: String, lastname: String, birthdate: String) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
  }
}
