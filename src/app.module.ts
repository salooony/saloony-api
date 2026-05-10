import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig, { DatabaseConfig } from './config/database.config';
import { UserModule, TokenGuard } from '@user';
import { AddressModule } from '@address/infrastructure/modules/address.module';
import jwtConfig from '@config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { TokensModule } from '@token/infrastructure/modules/token.module';
import { AuthorizationGuard } from '@shared/guards/authorization.guard';
import { NotificationModule } from '@notification';
import { SalonModule } from '@salon';
import { EventDispatcherModule } from '@shared/event-dispatcher';

const ENV = process.env.NODE_ENV;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get<DatabaseConfig | undefined>('database');

        if (!db) {
          throw new Error('Database configuration is missing');
        }

        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),

    UserModule,
    AddressModule,
    TokensModule,
    NotificationModule,
    SalonModule,
    EventDispatcherModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
