import { Injectable } from '@nestjs/common';
import { TokenGeneratorType } from '@token/domain/enums/token-generator-type.enum';
import { TokenGeneratorRegistry } from '@token/application/token-generator.registry';

@Injectable()
export class TokenGeneratorService {
  constructor(private readonly registry: TokenGeneratorRegistry) {}

  generate(type: TokenGeneratorType, options?: Record<string, unknown>): string {
    const generator = this.registry.getGenerator(type);
    return generator.generate(options);
  }
}
