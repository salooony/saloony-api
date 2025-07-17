import { UserSaloon } from '@domain/entities/user-saloon';
import { UserSaloon as UserSaloonEntity } from '@infrastructure/schemas/user-saloon.entity';
import { SaloonMapper } from './saloon.mapper';

export class UserSaloonMapper {
  static map(userSaloonEntity: UserSaloonEntity): UserSaloon {
    const userSaloon = new UserSaloon();

    userSaloon.role = userSaloonEntity.role;
    userSaloon.saloon = SaloonMapper.map(userSaloonEntity.saloon);

    return userSaloon;
  }

  static toEntity(userSaloon: UserSaloon): UserSaloonEntity {
    const entity = new UserSaloonEntity();

    entity.role = userSaloon.role;

    return entity;
  }
}
