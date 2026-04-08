import { Module } from '@nestjs/common';
import { TokenGeneratorService } from '@token/application/service/token-generator.service';
import { TokenGeneratorRegistry, TOKEN_GENERATORS } from '@token/application/token-generator.registry';
import { NumericTokenGenerator } from '@token/generators/numeric-token.generator';
import { UrlSafeStringTokenGenerator } from '@token/generators/url-safe-string-token.generator';
import { TokenRepository } from '@token/infrastructure/repositories/token.repository';
import { TOKEN_REPOSITORY } from '@token/domain/ports/itoken.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '@token/infrastructure/schemas/token.schema';
import { TokenService } from '@token/application/service/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [
    NumericTokenGenerator,
    UrlSafeStringTokenGenerator,

    {
      provide: TOKEN_GENERATORS,
      useFactory: (numeric: NumericTokenGenerator, url: UrlSafeStringTokenGenerator) => [numeric, url],
      inject: [NumericTokenGenerator, UrlSafeStringTokenGenerator],
    },

    TokenGeneratorRegistry,
    TokenGeneratorService,

    {
      provide: TOKEN_REPOSITORY,
      useClass: TokenRepository,
    },
  ],
  exports: [TokenService],
})
export class TokensModule {}
