import { Module } from '@nestjs/common';
import { TokenGeneratorService } from '@token/application/token-generator.service';
import { TokenGeneratorRegistry, TOKEN_GENERATORS } from '@token/application/token-generator.registry';
import { NumericTokenGenerator } from '@token/generators/numeric-token.generator';
import { UrlSafeStringTokenGenerator } from '@token/generators/url-safe-string-token.generator';

@Module({
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
  ],

  exports: [TokenGeneratorService],
})
export class TokensModule {}
