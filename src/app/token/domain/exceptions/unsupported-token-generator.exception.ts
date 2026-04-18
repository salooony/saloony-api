import { BadRequestException } from '@nestjs/common';

export class UnsupportedTokenGeneratorException extends BadRequestException {
  constructor(type: string) {
    super(`Unsupported TokenGeneratorType: ${type}`);
  }
}
