import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ITokenRepository } from '@app/token/domin/ports/itoken.repository';
import { Token } from '@token/domin/entities/token.entity';
import { TokenSchema } from '../schemas/token.schema';
import { TokenMapper } from '../mappers/token.mapper';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @InjectRepository(TokenSchema)
    private readonly repository: Repository<TokenSchema>,
  ) {}

  async save(token: Token): Promise<void> {
    const entity = TokenMapper.toEntity(token);
    await this.repository.save(entity);
  }

  async findByToken(token: string, ownerId?: string): Promise<Token | null> {
    const entity = await this.repository.findOne({
      where: { token, ...(ownerId && { ownerId }) },
      relations: ['owner'],
    });

    if (!entity) return null;

    return TokenMapper.toDomain(entity);
  }
}
