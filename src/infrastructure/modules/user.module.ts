import { UserTransformer } from '@application/user/transformers/user.transformer';
import { CreateUserUsecase } from '@application/user/usecases/create.usecase';
import { UserController } from '@infrastructure/controllers/user.controller';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { UsersRepository } from '@infrastructure/repositories/user.repository';
import { Saloon } from '@infrastructure/schemas/saloon.schema';
import { User_Saloon } from '@infrastructure/schemas/user-saloon.schema';
import { User } from '@infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, User_Saloon, Saloon])],
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
