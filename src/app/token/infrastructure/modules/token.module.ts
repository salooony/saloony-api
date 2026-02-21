import { Module } from '@nestjs/common';
import { TokenGeneratorService } from '@app/token/application/service/token-generator.service';
import { TokenGeneratorRegistry, TOKEN_GENERATORS } from '@token/application/token-generator.registry';
import { NumericTokenGenerator } from '@token/generators/numeric-token.generator';
import { UrlSafeStringTokenGenerator } from '@token/generators/url-safe-string-token.generator';
import { TypeOrmTokenRepository } from '@token/infrastructure/repositories/typeorm-token.repository';
import { TOKEN_REPOSITORY } from '@token/domin/ports/token.repository.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenSchema } from '@token/infrastructure/schemas/token.schema';
import { TokenService } from '@token/application/service/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenSchema])],
  providers: [
    NumericTokenGenerator,
    UrlSafeStringTokenGenerator,

    {
      provide: TOKEN_GENERATORS,
      useFactory: (
        numeric: NumericTokenGenerator,
        url: UrlSafeStringTokenGenerator,
      ) => [numeric, url],
      inject: [NumericTokenGenerator, UrlSafeStringTokenGenerator],
    },

    TokenGeneratorRegistry,
    TokenGeneratorService,

    {
      provide: TOKEN_REPOSITORY,
      useClass: TypeOrmTokenRepository,
    },
  ],
  exports: [TokenGeneratorService , TokenService],
})
export class TokensModule {}


