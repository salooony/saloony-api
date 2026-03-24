import { randomInt } from 'crypto';
import { TokenGenerator } from './token-generator.interface';
import { TokenGeneratorType } from '@token/domain/enums/token-generator-type.enum';
import { z } from 'zod';

const DEFAULT_DIGITS = 6;

const NumericOptionsSchema = z.object({
  digits: z.number().int().positive().default(DEFAULT_DIGITS),
});
type NumericOptions = z.infer<typeof NumericOptionsSchema>;

function parseNumericOptions(options?: unknown): NumericOptions {
  return NumericOptionsSchema.parse(options ?? {});
}

export class NumericTokenGenerator implements TokenGenerator {
  supports(type: TokenGeneratorType): boolean {
    return type === TokenGeneratorType.NUMBER;
  }

  generate(options?: Record<string, unknown>): string {
    const { digits } = parseNumericOptions(options);

    const max = 10 ** digits;
    const num = randomInt(0, max);

    return num.toString().padStart(digits, '0');
  }
}
