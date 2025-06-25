import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { Module } from '@nestjs/common';
import { UserModule } from './user.module';

@Module({
  imports: [],
  providers: [CustomerTransformer],
  exports: [CustomerTransformer],
})
export class CustomerModule {}
