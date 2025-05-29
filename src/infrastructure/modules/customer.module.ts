import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { CustomerController } from '@infrastructure/controllers/customer.controller';
import { CustomerRepository } from '@infrastructure/repositories/customer.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CreateCustomerUsecase,
    CustomerTransformer,
    { provide: 'CustomerRepository', useClass: CustomerRepository },
  ],
})
export class CustomerModule {}
