import { ApiProperty } from '@nestjs/swagger';

export abstract class PersonResponseDto {
  @ApiProperty({
    description: 'The id stored in the database',
    type: String,
    example: '70',
  })
  public id: string;

  @ApiProperty({
    description: 'The first name',
    type: String,
    example: 'John',
  })
  public firstname: string;

  @ApiProperty({
    description: 'The last name',
    type: String,
    example: 'Doe',
  })
  public lastname: string;

  @ApiProperty({
    description: 'The date of birth',
    type: Date,
    example: '4/3/2005',
  })
  public birthdate: Date;

  @ApiProperty({
    description: 'The URL of the profile image',
    type: String,
    example: 'https://saloony.ts/images/3135153',
  })
  public imageURL: string;

  constructor(id: string, firstname: string, lastname: string, birthdate: Date, imageURL: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.imageURL = imageURL;
  }
}
