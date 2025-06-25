import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { CreateSaloonUserUsecase } from '@application/person/user/saloon-user/usecases/create.usecase';
import { SaloonUserTransformer } from '@application/person/transformers/saloon-user.transformer';

@Module({
  imports: [],
  providers: [SaloonUserTransformer],
  exports: [SaloonUserTransformer],
})
export class SaloonUserModule {}
