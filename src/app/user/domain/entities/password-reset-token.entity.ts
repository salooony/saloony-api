export class PasswordResetToken {
  public id: string;
  public userId: string;
  public tokenHash: string;
  public expiresAt: Date;
  public usedAt?: Date | null;
  public type?: string;
  public createdAt: Date;

  constructor(props: {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    usedAt?: Date | null;
    type?: string;
    createdAt?: Date;
  }) {
    this.id = props.id ?? '';
    this.userId = props.userId;
    this.tokenHash = props.tokenHash;
    this.expiresAt = props.expiresAt;
    this.usedAt = props.usedAt ?? null;
    this.type = props.type ?? 'password_reset';
    this.createdAt = props.createdAt ?? new Date();
  }
}
