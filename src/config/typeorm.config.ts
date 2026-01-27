import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '@app/user/infrastructure/schemas/user.entity';
import { Salon } from '@app/salon/infrastructure/schemas/salon.entity';
import { SalonMembershipEntity } from '@app/user/infrastructure/schemas/salon-membership.entity';

dotenv.config();

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [User, Salon, SalonMembershipEntity],
  migrations: ['src/migrations/*.ts'],
});
