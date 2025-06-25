import { UserController } from '@infrastructure/controllers/user.controller';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { UsersRepository } from '@infrastructure/repositories/user.repository';
import { Saloon } from '@infrastructure/schemas/saloon.schema';
import { User_Saloon } from '@infrastructure/schemas/user-saloon.schema';
import { User } from '@infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer.module';
import { SaloonUserModule } from './saloon-user.module';
import { CreateSaloonUserUsecase } from '@application/person/user/saloon-user/usecases/create.usecase';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, User_Saloon, Saloon]),
    CustomerModule,
    SaloonUserModule,
  ],
  controllers: [UserController],
  providers: [
    CreateCustomerUsecase,
    CreateSaloonUserUsecase,
    { provide: 'UsersRepository', useClass: UsersRepository },
    { provide: 'HashingProvider', useClass: BcryptHashingProvider },
  ],
  exports: [
    CreateCustomerUsecase,
    CreateSaloonUserUsecase,
    { provide: 'UsersRepository', useClass: UsersRepository },
  ],
})
export class UserModule {}
