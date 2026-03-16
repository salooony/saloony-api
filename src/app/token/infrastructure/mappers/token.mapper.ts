import { Token } from '@app/token/domain/entities/token.entity';
import { Token as TokenSchema } from '../schemas/token.schema';
import { UserMapper } from '@app/user/infrastructure/mappers/user.mapper';

export class TokenMapper {
  static toDomain(entity: TokenSchema): Token {
    return new Token(entity.token, entity.createdAt, entity.expiredAt, entity.isHashed, UserMapper.map(entity.owner));
  }

  static toEntity(domain: Token): TokenSchema {
    const entity = new TokenSchema();

    entity.token = domain.token;
    entity.createdAt = domain.createdAt;
    entity.expiredAt = domain.expiredAt;
    entity.isHashed = domain.isHashed;
    entity.ownerId = domain.owner.id;

    return entity;
  }
}
