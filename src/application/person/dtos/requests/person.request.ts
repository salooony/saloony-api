import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString } from 'class-validator';

export abstract class PersonRequestDto {
  @ApiProperty({
    description: 'The first name',
    type: String,
    required: true,
    example: 'John',
  })
  // @IsNotEmpty()
  // @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'The last name',
    type: String,
    required: true,
    example: 'Doe',
  })
  // @IsNotEmpty()
  // @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'The date of birth',
    type: String,
    required: true,
    example: '4/3/2005',
  })
  // @IsNotEmpty()
  // @IsString()
  public birthdate: Date;

  constructor(firstname: string, lastname: string, birthdate: Date) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
  }
}
