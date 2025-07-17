import { Saloon } from '@domain/entities/saloon';
import { Saloon as SaloonEntity } from '@infrastructure/schemas/saloon.entity';

export class SaloonMapper {
  static map(saloonEntity: SaloonEntity): Saloon {
    const saloon = new Saloon();

    saloon.id = saloonEntity.id;
    saloon.name = saloonEntity.name;
    saloon.description = saloonEntity.description;
    saloon.createdAt = saloonEntity.createdAt;
    saloon.updatedAt = saloonEntity.updatedAt;

    return saloon;
  }
}
