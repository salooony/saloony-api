import { UserSaloon } from '@domain/entities/user-saloon';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserSaloonsResponseDto {
  @ApiProperty({
    description: 'The id of the saloons the user has relationships with.',
    type: Number,
    required: true,
    example: 1,
  })
  public saloonId: number;

  @ApiProperty({
    description: 'The role of the user in this saloon.',
    type: Number,
    required: true,
    example: SaloonRoles.OWNER,
  })
  public role: SaloonRoles;

  private constructor() {}

  public static createFromEntity(userSloon: UserSaloon): UserSaloonsResponseDto {
    const response = new UserSaloonsResponseDto();

    response.saloonId = userSloon.saloon.id;
    response.role = userSloon.role;

    return response;
  }
}
