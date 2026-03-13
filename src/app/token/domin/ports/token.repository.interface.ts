import { TokenPurpose } from '@token/domin/enums/token-purpose.enum';
import { TokenSchema } from '@token/infrastructure/schemas/token.schema';

export interface ITokenRepository {
  create(data: {
    token: string;
    ownerId: string;
    expiredAt: Date | null;
    isHashed: boolean;
    type: TokenPurpose;
  }): Promise<TokenSchema>;
  findByOwnerTokenAndType(ownerId: string, token: string, type: TokenPurpose): Promise<TokenSchema | null>;
  deleteById(id: string): Promise<void>;
  deleteByOwnerAndType(ownerId: string, type: TokenPurpose): Promise<void>;
}
