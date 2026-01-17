export class Token {
  constructor(
    public readonly token: string,
    public readonly createdAt: Date,
    public readonly expiredAt: Date,
    public readonly isHashed: boolean,
  ) {}

  isExpired(now = new Date()): boolean {
    return this.expiredAt.getTime() < now.getTime();
  }
}