import { Owner } from '@domain/entities/person/users/owner.entity';
import { UserResponseDto } from './user.response';
import { ShopsResponseDto } from '@application/shop/dtos/response/shop.response.dto';

export class OwnerResponseDto extends UserResponseDto {
  public shops: Array<ShopsResponseDto>;

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

  static createFromEntity(owner: Owner) {
    const ownerResponse = new OwnerResponseDto(
      owner.id,
      owner.firstname,
      owner.lastname,
      owner.birthdate,
      owner.imageURL,
      owner.email,
      owner.mobileNumber,
      owner.joinDate,
      owner.language,
    );
    ownerResponse.shops = owner.shops.map((shop) => ShopsResponseDto.createFromEntity(shop));
  }
}
