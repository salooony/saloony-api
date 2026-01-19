import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '@user/infrastructure/schemas/user.schema';
import { Salon } from '@salon/infrastructure/schemas/salon.entity';
import { SalonMembership } from '@user/infrastructure/schemas/salon-membership.schema';
import { Country } from '@address/infrastructure/schemas/country.schema';
import { City } from '@address/infrastructure/schemas/city.schema';
import { Address } from '@address/infrastructure/schemas/address.schema';

dotenv.config();

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [User, Salon, SalonMembership, Country, City, Address],
  migrations: ['src/migrations/*.ts'],
});
