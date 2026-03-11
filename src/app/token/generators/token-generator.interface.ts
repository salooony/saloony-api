import { TokenGeneratorType } from '@app/token/domain/enums/token-generator-type.enum';

export interface TokenGenerator {
  supports(type: TokenGeneratorType): boolean;

  generate(options?: Record<string, unknown>): string;
}
