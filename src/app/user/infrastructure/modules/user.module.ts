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
import { UserProfileController } from '../../infrastructure/controllers/user-profile.controller';
import { GetUserUseCase } from '../../application/usecases/get-user.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  ],
  controllers: [UserController, AuthController, UserProfileController],
  providers: [
    CreateUserUsecase,
    LoginUsecase,
    GetUserInfoUsecase,
    UserTransformer,
    GetUserUseCase,
    { provide: 'UsersRepository', useClass: UsersRepository },
    { provide: 'HashingProvider', useClass: BcryptHashingProvider },
    { provide: 'TokenGenerator', useClass: TokenGenerator },
  ],
  exports: [{ provide: 'UsersRepository', useClass: UsersRepository }],
})
export class UserModule {}
