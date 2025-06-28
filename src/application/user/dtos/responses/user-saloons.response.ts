import { UserSaloons } from '@domain/entities/user_saloons';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserSaloonsResponseDto {
  @ApiProperty({
    description: 'The id of the saloons the user has relationships with.',
    type: Number,
    required: true,
    example: 1,
  })
  public saloon_id: number;

  @ApiProperty({
    description: 'The role of the user in this saloon.',
    type: Number,
    required: true,
    example: SaloonRoles.OWNER,
  })
  public role: SaloonRoles;

  private constructor() {}

  public static createFromEntity(userSloons: UserSaloons): UserSaloonsResponseDto {
    const response = new UserSaloonsResponseDto();

    response.saloon_id = userSloons.saloon_id;
    response.role = userSloons.role;

    return response;
  }
}
