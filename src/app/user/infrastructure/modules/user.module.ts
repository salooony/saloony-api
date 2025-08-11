import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { Module } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { BcryptHashingProvider } from '../providers/bcrypt.hashing.provider';
import { CreateUserUsecase } from '@app/user/application/usecases/create.usecase';
import { UserTransformer } from '@app/user/application/transformers/user.transformer';
import { User } from '../schemas/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
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
