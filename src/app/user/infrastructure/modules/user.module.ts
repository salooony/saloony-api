import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { Module } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { BcryptHashingProvider } from '../providers/bcrypt.hashing.provider';
import { CreateUserUsecase } from '@app/user/application/usecases/create.usecase';
import { UserTransformer } from '@app/user/application/transformers/user.transformer';
import { User } from '../schemas/user.entity';
import { LoginUsecase } from '@app/user/application/usecases/login.usecase';
import { TokenGenerator } from '../providers/token-generator.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from '@config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { GetUserInfoUsecase } from '@app/user/application/usecases/get-user-info.usecase';
import { DeleteUserAccountUseCase } from '@app/user/application/usecases/delete-user-account.usecase';
import { MailerModule } from '@nestjs-modules/mailer';
import { SmtpEmailSender } from '../../infrastructure/email/smtpEmail.sender';
import { ForgotPasswordUseCase } from '../../application/usecases/forgot-password.usecase';
import { PasswordResetTokenRepository } from '../../infrastructure/repositories/password_reset_token.repository';
import { PasswordResetTokenEntity } from '../../infrastructure/schemas/password-reset-token.entity';
import { ResetPasswordUseCase } from '../../application/usecases/reset-password.usecase';

@Module({
  imports: [
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

    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          port: Number(configService.get<number>('EMAIL_PORT')) || 587,
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('EMAIL_USER'),
        },
      }),
    }),
  ],

  controllers: [UserController, AuthController],

  providers: [
    //  usecases
    CreateUserUsecase,
    LoginUsecase,
    GetUserInfoUsecase,
    DeleteUserAccountUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,

    //  helpers
    UserTransformer,

    //  repositories & providers
    { provide: 'UsersRepository', useClass: UsersRepository },
    { provide: 'HashingProvider', useClass: BcryptHashingProvider },
    { provide: 'TokenGenerator', useClass: TokenGenerator },
    { provide: 'PasswordResetTokenRepository', useClass: PasswordResetTokenRepository },

    { provide: 'IEmailSender', useClass: SmtpEmailSender },
    { provide: 'IUserRepository', useClass: UsersRepository },
  ],

  exports: [{ provide: 'UsersRepository', useClass: UsersRepository }],
})
export class UserModule {}
