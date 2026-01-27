import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenSchema } from '../schemas/token.schema';

@Module({
  imports: [TypeOrmModule.forFeature([TokenSchema])],
  providers: [],
  exports: [],
})
export class TokenModule {}
