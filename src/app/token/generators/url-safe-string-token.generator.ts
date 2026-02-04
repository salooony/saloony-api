import { randomBytes } from 'crypto';
import { TokenGenerator } from './token-generator.interface';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';
import { z } from 'zod';

const DEFAULT_BYTES = 32;

// schema
const UrlSafeOptionsSchema = z.object({
  bytes: z.number().int().positive().default(DEFAULT_BYTES),
});

type UrlSafeOptions = z.infer<typeof UrlSafeOptionsSchema>;

function parseUrlSafeOptions(options?: unknown): UrlSafeOptions {
  return UrlSafeOptionsSchema.parse(options ?? {});
}

export class UrlSafeStringTokenGenerator implements TokenGenerator {
  supports(type: TokenGeneratorType): boolean {
    return type === TokenGeneratorType.URL_SAFE_STRING;
  }

  generate(options?: Record<string, unknown>): string {
    const { bytes } = parseUrlSafeOptions(options);

    const buffer = randomBytes(bytes);

    return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
}
