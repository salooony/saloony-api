import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITokenRepository } from '../../domain/ports/itoken.repository';
import { Token } from '../../domain/entities/token.entity';
import { Token as TokenSchema } from '../schemas/token.schema';

import { TokenMapper } from '../mappers/token.mapper';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(@InjectRepository(TokenSchema) private readonly repository: Repository<TokenSchema>) {}

  async save(token: Token): Promise<Token> {
    const entity = TokenMapper.toEntity(token);

    return TokenMapper.toDomain(
      await this.repository.save(entity)
    );
  }

  async findByToken(token: string, ownerId?: string): Promise<Token | null> {
    const entity = await this.repository.findOne({
      where: { token, ...(ownerId && { ownerId }) },
      relations: ['owner'],
    });

    if (!entity) {
      return null;
    } 

    return TokenMapper.toDomain(entity);
  }
}
