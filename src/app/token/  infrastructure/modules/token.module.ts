import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from '../schemas/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  providers: [],
  exports: [],
})
export class TokenModule {}