import { Injectable, Inject } from '@nestjs/common';
import { TokenGenerator } from '@token/generators/token-generator.interface';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';

export const TOKEN_GENERATORS = 'TOKEN_GENERATORS';

@Injectable()
export class TokenGeneratorRegistry {
  constructor(
    @Inject(TOKEN_GENERATORS)
    private readonly generators: TokenGenerator[],
  ) {}

  getGenerator(type: TokenGeneratorType): TokenGenerator {
    const generator = this.generators.find((g) => g.supports(type));

    if (!generator) {
      throw new Error(`Unsupported TokenGeneratorType: ${type}`);
    }

    return generator;
  }
}