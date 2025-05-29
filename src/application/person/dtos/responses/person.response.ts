export abstract class PersonResponseDto {
  public id: String;
  public firstname: String;
  public lastname: String;
  public birthdate: String;
  public imageURL: String;

  constructor(
    id: String,
    firstname: String,
    lastname: String,
    birthdate: String,
    imageURL: String,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.imageURL = imageURL;
  }
}
