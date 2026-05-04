import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '@user/infrastructure/schemas/user.schema';
import { SalonSchema as Salon, ServiceSchema as Service, ServiceCategorySchema as ServiceCategory } from '@salon';
import { SalonMembership } from '@user/infrastructure/schemas/salon-membership.schema';
import { Address } from '@address/infrastructure/schemas/address.schema';
import { City } from '@address/infrastructure/schemas/city.schema';
import { Country } from '@address/infrastructure/schemas/country.schema';
import { Token } from '@token/infrastructure/schemas/token.schema';
import { Template as NotificationTemplate } from '@notification/infrastructure/schemas/template.schema';
import { PasswordResetTokenEntity as PasswordResetToken } from '@user/infrastructure/schemas/password-reset-token.schema';

dotenv.config();

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [
    User,
    Salon,
    Service,
    ServiceCategory,
    SalonMembership,
    Address,
    City,
    Country,
    Token,
    NotificationTemplate,
    PasswordResetToken,
  ],
  migrations: ['src/migrations/*.ts'],
});
