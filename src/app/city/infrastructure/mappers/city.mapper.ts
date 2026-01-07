import { City } from '@app/city/domain/entities/city';
import { City as CityEntity } from '../schemas/city.entity';

export class CityMapper {
  static map(cityEntity: CityEntity): City {
    const city = new City();

    city.id = cityEntity.id;
    city.name = cityEntity.name;
    city.createdAt = cityEntity.createdAt;
    city.updatedAt = cityEntity.updatedAt;

    return city;
  }

  static toEntity(city: City): CityEntity {
    const entity = new CityEntity();

    entity.name = city.name;

    return entity;
  }
}
