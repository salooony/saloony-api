import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { IHashingProvider } from '../../application';

@Injectable()
export class BcryptHashingProvider implements IHashingProvider {
  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(data, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
