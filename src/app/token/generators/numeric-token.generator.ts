import { randomInt } from 'crypto';
import { TokenGenerator } from './token-generator.interface';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';

export class NumericTokenGenerator implements TokenGenerator {
  supports(type: TokenGeneratorType): boolean {
    return type === TokenGeneratorType.NUMBER;
  }

  generate(options?: Record<string, unknown>): string {
    const digits = options?.digits as number ?? 6;

    if (!Number.isInteger(digits) || digits <= 0) {
      throw new Error('Invalid digits option');
    }

    const max = 10 ** digits;
    const num = randomInt(0, max);

    return num.toString().padStart(digits, '0');
  }
}