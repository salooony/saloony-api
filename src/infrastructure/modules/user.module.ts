import { UserTransformer } from '@application/user/transformers/user.transformer';
import { CreateUserUsecase } from '@application/user/usecases/create.usecase';
import { UserController } from '@infrastructure/controllers/user.controller';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { UsersRepository } from '@infrastructure/repositories/user.repository';
import { Saloon } from '@infrastructure/schemas/saloon.entity';
import { UserSaloon } from '@infrastructure/schemas/user-saloon.entity';
import { User } from '@infrastructure/schemas/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSaloon, Saloon])],
  controllers: [UserController],
  providers: [
    CreateUserUsecase,
    UserTransformer,
    { provide: 'UsersRepository', useClass: UsersRepository },
    { provide: 'HashingProvider', useClass: BcryptHashingProvider },
  ],
  exports: [{ provide: 'UsersRepository', useClass: UsersRepository }],
})
export class UserModule {}
