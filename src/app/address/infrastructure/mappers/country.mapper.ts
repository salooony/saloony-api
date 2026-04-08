import { Country } from '@address/domain/entities/country.entity';
import { Country as CountrySchema } from '../schemas/country.schema';

export class CountryMapper {
  static map(schema: CountrySchema): Country {
    return new Country(schema.id, schema.code, schema.icon, schema.name, schema.isActive);
  }

  static toSchema(country: Country): CountrySchema {
    const schema = new CountrySchema();
    if (country.id) schema.id = country.id;
    schema.code = country.code;
    schema.icon = country.icon;
    schema.name = country.name;
    schema.isActive = country.isActive;
    return schema;
  }
}
