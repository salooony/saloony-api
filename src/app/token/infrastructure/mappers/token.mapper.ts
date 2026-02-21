import { Token } from '@token/domin/entities/token.entity';
import { TokenSchema } from '../schemas/token.schema';
import { UserMapper } from '@user/infrastructure/mappers/user.mapper';

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
    entity.owner = UserMapper.toEntity(domain.owner);
    entity.ownerId = domain.owner.id;

    return entity;
  }
}
