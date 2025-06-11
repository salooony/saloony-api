import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { CustomerController } from '@infrastructure/controllers/customer.controller';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { CustomersRepository } from '@infrastructure/repositories/customer.repository';
import { Customer } from '@infrastructure/schemas/user/customer.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    CreateCustomerUsecase,
    CustomerTransformer,
    { provide: 'CustomersRepository', useClass: CustomersRepository },
    { provide: 'HashingProvider', useClass: BcryptHashingProvider },
  ],
})
export class CustomerModule {}
