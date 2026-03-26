import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { Module } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { USERS_REPOSITORY } from '@user/domain/ports/iuser.repository';
import { BcryptHashingProvider } from '../providers/bcrypt.hashing.provider';
import { CreateUserUsecase } from '@user/application/usecases/create.usecase';
import { UserTransformer } from '@user/application/transformers/user.transformer';
import { User } from '../schemas/user.entity';
import { LoginUsecase } from '@user/application/usecases/login.usecase';
import { TokenGenerator } from '../providers/token-generator.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from '@config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { GetUserInfoUsecase } from '@user/application/usecases/get-user-info.usecase';
import { UpdateUserAvatarUsecase } from '@user/application/usecases/update-user-avatar.usecase';
import { FileModule } from '@shared/uploads/infrastructure/modules/file.module';

import { SmtpEmailSender } from '../../infrastructure/email/smtpEmail.sender';
import { ForgotPasswordUseCase } from '../../application/usecases/forgot-password.usecase';
import { PasswordResetTokenRepository } from '../../infrastructure/repositories/password_reset_token.repository';
import { PasswordResetTokenEntity } from '../../infrastructure/schemas/password-reset-token.entity';
import { ResetPasswordUseCase } from '../../application/usecases/reset-password.usecase';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'localhost',
        port: Number(process.env.MAIL_PORT) || 1025,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
    TypeOrmModule.forFeature([User, PasswordResetTokenEntity]),
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
    FileModule,
  ],

  controllers: [UserController, AuthController],

  providers: [
    //  usecases
    CreateUserUsecase,
    LoginUsecase,
    GetUserInfoUsecase,
    UpdateUserAvatarUsecase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,

    //  helpers
    UserTransformer,

    //  repositories & providers
    { provide: USERS_REPOSITORY, useClass: UsersRepository },
    { provide: 'HashingProvider', useClass: BcryptHashingProvider },
    { provide: 'TokenGenerator', useClass: TokenGenerator },
    { provide: 'PasswordResetTokenRepository', useClass: PasswordResetTokenRepository },

    { provide: 'IEmailSender', useClass: SmtpEmailSender },
    { provide: 'IUserRepository', useClass: UsersRepository },
  ],

  exports: [{ provide: USERS_REPOSITORY, useClass: UsersRepository }],
})
export class UserModule {}
