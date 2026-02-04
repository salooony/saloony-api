import { randomBytes } from 'crypto';
import { TokenGenerator } from './token-generator.interface';
import { TokenGeneratorType } from '@token/domin/enums/token-generator-type.enum';

export class UrlSafeStringTokenGenerator implements TokenGenerator {
  supports(type: TokenGeneratorType): boolean {
    return type === TokenGeneratorType.URL_SAFE_STRING;
  }

  generate(options?: Record<string, unknown>): string {
    const bytes = options?.bytes as number ?? 32;

    if (!Number.isInteger(bytes) || bytes <= 0) {
      throw new Error('Invalid bytes option');
    }

    return randomBytes(bytes)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}