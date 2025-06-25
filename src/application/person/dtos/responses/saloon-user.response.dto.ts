import { SaloonUser } from '@domain/entities/person/users/saloon-user.entity';
import { UserResponseDto } from './user.response';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';

export class SaloonUserResponseDto extends UserResponseDto {
  public saloons: Array<{ saloonId: string; role: SaloonRoles }>;

  private constructor(
    id: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    imageURL: string,
    email: string,
    mobileNumber: string,
    joinDate: Date,
    language: string,
  ) {
    super(id, firstname, lastname, birthdate, imageURL, email, mobileNumber, joinDate, language);
  }

  static createFromEntity(saloonUser: SaloonUser) {
    const saloonUserResponse = new SaloonUserResponseDto(
      saloonUser.id,
      saloonUser.firstname,
      saloonUser.lastname,
      saloonUser.birthdate,
      saloonUser.imageURL,
      saloonUser.email,
      saloonUser.mobileNumber,
      saloonUser.joinDate,
      saloonUser.language,
    );

    saloonUserResponse.saloons = saloonUser.saloons.map((saloonObject) => ({
      saloonId: saloonObject.saloon.id,
      role: saloonObject.role,
    }));

    return saloonUserResponse;
  }
}
