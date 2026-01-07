import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '@app/user/infrastructure/schemas/user.entity';
import { Saloon } from '@app/saloon/infrastructure/schemas/saloon.entity';
import { City } from '@app/city/infrastructure/schemas/city.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [User, Saloon, City],
  migrations: ['src/migrations/*.ts'],
});
