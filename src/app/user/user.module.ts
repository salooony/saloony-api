import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import jwtConfig from '@config/jwt.config';
import { Salon } from '@salon/infrastructure/schemas/salon.entity';
import { TokensModule } from '@token/infrastructure/modules/token.module';
import { TemplateModule } from '@notification/infrastructure/modules/template.module';
import { FileModule } from '@shared/uploads/infrastructure/modules/file.module';

import {
  UserTransformer,
  LoginUsecase,
  ForgotPasswordUsecase,
  ResetPasswordUsecase,
  CreateUserUsecase,
  GetUserInfoUsecase,
  DeleteUserAccountUsecase,
  UpdateAvatarUsecase,
  HASHING_PROVIDER,
} from './application';
import { TOKEN_GENERATOR, USERS_REPOSITORY } from './domain';
import {
  UserController,
  AuthController,
  BcryptHashingProvider,
  TokenGenerator,
  // PasswordResetTokensRepository,
  UsersRepository,
  // PasswordResetToken,
  SalonMembership,
  User,
} from './infrastructure';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SalonMembership, Salon]),
    ConfigModule.forFeature(jwtConfig),

    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: configService.get('jwt.signOptions'),
        };
      },
    }),
    forwardRef(() => TokensModule),
    TemplateModule,
    FileModule,
  ],

  controllers: [UserController, AuthController],

  providers: [
    //  usecases
    CreateUserUsecase,
    LoginUsecase,
    GetUserInfoUsecase,
    DeleteUserAccountUsecase,
    ForgotPasswordUsecase,
    ResetPasswordUsecase,
    UpdateAvatarUsecase,

    //  helpers
    UserTransformer,

    //  repositories & providers
    { provide: USERS_REPOSITORY, useClass: UsersRepository },
    { provide: HASHING_PROVIDER, useClass: BcryptHashingProvider },
    { provide: TOKEN_GENERATOR, useClass: TokenGenerator },
    // { provide: 'PasswordResetTokensRepository', useClass: PasswordResetTokensRepository },
  ],

  exports: [{ provide: USERS_REPOSITORY, useClass: UsersRepository }],
})
export class UserModule {}
