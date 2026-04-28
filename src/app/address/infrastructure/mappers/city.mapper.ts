import { City } from '@address/domain/entities/city.entity';
import { Country } from '@address/domain/entities/country.entity';
import { City as CitySchema } from '../schemas/city.schema';

export class CityMapper {
  static map(schema: CitySchema): City {
    return new City(
      schema.id,
      schema.name,
      new Country(
        schema.country.id,
        schema.country.code,
        schema.country.icon,
        schema.country.name,
        schema.country.isActive,
      ),
    );
  }

  static toSchema(city: City): CitySchema {
    const schema = new CitySchema();

    schema.id = city.id;
    schema.name = city.name;
    schema.countryId = city.country.id;

    return schema;
  }
}
