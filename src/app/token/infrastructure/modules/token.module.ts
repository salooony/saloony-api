import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenGeneratorRegistry, TOKEN_GENERATORS } from '@token/application/token-generator.registry';
import { TokenGeneratorService } from '@token/application/token-generator.service';
import { TokenPurpose } from '@token/domin/enums/token-purpose.enum';
import { NumericTokenGenerator } from '@token/generators/numeric-token.generator';
import { UrlSafeStringTokenGenerator } from '@token/generators/url-safe-string-token.generator';
import { TokenRepository } from '@token/infrastructure/repositories/token.repository';
import { TokenSchema } from '@token/infrastructure/schemas/token.schema';

@Module({
  imports: [TypeOrmModule.forFeature([TokenSchema])],
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
    TokenRepository,
    { provide: 'ITokenRepository', useClass: TokenRepository },
    { provide: 'TOKEN_PURPOSE', useValue: TokenPurpose },
  ],
  exports: [TokenGeneratorService, 'ITokenRepository'],
})
export class TokensModule {}
