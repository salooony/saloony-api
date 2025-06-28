import { User } from '@domain/entities/user';
import { Roles } from '@domain/enums/roles.enum';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserSaloonsResponseDto } from './user-saloons.response';

export class UserResponseDto {
  @ApiProperty({
    description: 'The id stored in the database.',
    type: Number,
    example: 70,
  })
  public id: number;

  @ApiProperty({
    description: 'The first name.',
    type: String,
    example: 'John',
  })
  public firstname: string;

  @ApiProperty({
    description: 'The last name.',
    type: String,
    example: 'Doe',
  })
  public lastname: string;

  @ApiProperty({
    description: 'The date of birth.',
    type: Date,
    example: '4/3/2005',
  })
  public birthdate: Date;

  @ApiProperty({
    description: 'The role of the user (could be client or saloon user).',
    type: String,
    required: true,
    example: 'Client',
  })
  public role: Roles;

  @ApiProperty({
    description: 'The email address.',
    type: String,
    example: 'example@email.com',
  })
  public email: string;

  @ApiProperty({
    description: 'The mobile number.',
    type: String,
    example: '002105495626',
  })
  public mobileNumber: string;

  @ApiProperty({
    description: 'The date at which the account was created.',
    type: Date,
    example: '4/3/2026',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'The date at which the account was updated.',
    type: Date,
    example: '4/3/2026',
  })
  public updatedAt: Date;

  @ApiProperty({
    description: 'The language the user prefers to use the application.',
    type: String,
    required: true,
    example: 'French',
  })
  public language: string;

  @ApiProperty({
    description: 'The saloons the user has interacted with.',
    type: UserSaloonsResponseDto,
    required: false,
  })
  public user_saloons: Array<UserSaloonsResponseDto>;

  private constructor() {}

  public static createFromEntity(user: User) {
    const userResponse = new UserResponseDto();

    userResponse.id = user.id;
    userResponse.firstname = user.firstname;
    userResponse.lastname = user.lastname;
    userResponse.birthdate = user.birthdate;
    userResponse.role = user.getRole();
    userResponse.email = user.email;
    userResponse.mobileNumber = user.mobileNumber;
    userResponse.createdAt = user.createdAt;
    userResponse.updatedAt = user.updatedAt;
    userResponse.language = user.language;

    userResponse.user_saloons = user.saloons.map((saloon) =>
      UserSaloonsResponseDto.createFromEntity(saloon),
    );

    return userResponse;
  }
}
