import { User } from '@app/user/domain/entities/user';
import { TokenType } from '../enums/token-type.enum';


export class Token {
  constructor(
    public readonly token: string,
    public readonly createdAt: Date,
    public readonly expiredAt: Date | null,
    public readonly isHashed: boolean,
    public readonly  owner: User,
    public readonly type: TokenType,
  ) {}

isExpired(now = new Date()): boolean {
  if (!this.expiredAt) return false;
  return this.expiredAt.getTime() < now.getTime();
}
}

