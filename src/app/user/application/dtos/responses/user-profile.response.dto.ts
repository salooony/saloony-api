import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/user/domain/entities/user';

export class UserProfileResponseDto {
  @ApiProperty({ example: 'uuid-string', description: 'User unique identifier' })
  id: string;

  @ApiProperty({ example: 'Rozana', description: 'First name of the user' })
  firstname: string;

  @ApiProperty({ example: 'Shaqqoura', description: 'Last name of the user' })
  lastname: string;

  @ApiProperty({
    example: 'https://cdn.app.com/avatar.png',
    description: 'User profile avatar URL',
    nullable: true,
  })
  avatar: string;

  @ApiProperty({
    example: '1998-05-10',
    description: 'User birth date',
    type: String,
    format: 'date',
  })
  birthdate: Date;

  @ApiProperty({ example: 'USER', description: 'User role' })
  role: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: '+970599999999',
    description: 'User mobile number',
  })
  mobileNumber: string;

  @ApiProperty({ example: 'en', description: 'Preferred language' })
  language: string;

  @ApiProperty({
    example: '2024-01-01T10:00:00.000Z',
    description: 'Account creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-10T10:00:00.000Z',
    description: 'Last profile update date',
  })
  updatedAt: Date;

  static fromUser(user: User): UserProfileResponseDto {
    const dto = new UserProfileResponseDto();

    dto.id = user.id;
    dto.firstname = user.firstname;
    dto.lastname = user.lastname;
    dto.avatar = user.avatar;
    dto.birthdate = user.birthdate;
    dto.role = user.role;
    dto.email = user.email;
    dto.mobileNumber = user.mobileNumber;
    dto.language = user.language;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;

    return dto;
  }
}
