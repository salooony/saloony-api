import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPurpose } from '@token/domin/enums/token-purpose.enum';
import { ITokenRepository } from '@token/domin/ports/token.repository.interface';
import { TokenSchema } from '@token/infrastructure/schemas/token.schema';
import { Repository } from 'typeorm';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @InjectRepository(TokenSchema)
    private readonly repository: Repository<TokenSchema>,
  ) {}

  create(data: {
    token: string;
    ownerId: string;
    expiredAt: Date | null;
    isHashed: boolean;
    type: TokenPurpose;
  }): Promise<TokenSchema> {
    return this.repository.save(this.repository.create(data));
  }

  findByOwnerTokenAndType(ownerId: string, token: string, type: TokenPurpose): Promise<TokenSchema | null> {
    return this.repository.findOne({ where: { ownerId, token, type } });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByOwnerAndType(ownerId: string, type: TokenPurpose): Promise<void> {
    await this.repository.delete({ ownerId, type });
  }
}
