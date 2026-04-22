import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { Module, forwardRef } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { BcryptHashingProvider } from '../providers/bcrypt.hashing.provider';
import { CreateUserUsecase } from '@user/application/usecases/create.usecase';
import { UserTransformer } from '@user/application/transformers/user.transformer';
import { User } from '@user/infrastructure/schemas/user.schema';
import { LoginUsecase } from '@user/application/usecases/login.usecase';
import { TokenGenerator } from '@user/infrastructure/providers/token-generator.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from '@config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@user/infrastructure/controllers/auth.controller';
import { GetUserInfoUsecase } from '@user/application/usecases/get-user-info.usecase';
import { DeleteUserAccountUseCase } from '@user/application/usecases/delete-user-account.usecase';
import { MailerModule } from '@nestjs-modules/mailer';
import { SmtpEmailSender } from '@user/infrastructure/email/smtpEmail.sender';
import { ForgotPasswordUseCase } from '@user/application/usecases/forgot-password.usecase';
import { PasswordResetTokenRepository } from '@user/infrastructure/repositories/password_reset_token.repository';
import { PasswordResetTokenEntity } from '@user/infrastructure/schemas/password-reset-token.schema';
import { SalonMembership } from '@user/infrastructure/schemas/salon-membership.schema';
import { ResetPasswordUseCase } from '@user/application/usecases/reset-password.usecase';
import { Salon } from '@salon/infrastructure/schemas/salon.entity';
import { UpdateAvatarUsecase } from '@user/application/usecases/update-avatar.usecase';

import { NotificationModule } from '@notification/infrastructure/modules/notification.module';
import { TokensModule } from '@token/infrastructure/modules/token.module';
import { TemplateModule } from '@notification/infrastructure/modules/template.module';
import { FileModule } from '@shared/uploads/infrastructure/modules/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PasswordResetTokenEntity, SalonMembership, Salon]),
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
    NotificationModule,
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
    DeleteUserAccountUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    UpdateAvatarUsecase,

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

  exports: [
    { provide: 'UsersRepository', useClass: UsersRepository },
    { provide: 'IUserRepository', useClass: UsersRepository },
  ],
})
export class UserModule {}
