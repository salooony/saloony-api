import { UserStatus } from '../enums/user-status.enum';
import { UserRole } from '../enums/user-role.enum';

export class User {
  private static readonly EMAIL_VERIFIED_STATUSES = new Set<UserStatus>([
    UserStatus.WAITING_PHONE_VERIFICATION,
    UserStatus.WAITING_OPERATOR_VALIDATION,
    UserStatus.ACTIVE,
    UserStatus.BLOCKED,
  ]);

  private static readonly PHONE_VERIFIED_STATUSES = new Set<UserStatus>([
    UserStatus.WAITING_OPERATOR_VALIDATION,
    UserStatus.ACTIVE,
    UserStatus.BLOCKED,
  ]);

  public id: string;
  public firstname: string;
  public lastname: string;
  public avatar: string;
  public birthdate: Date;
  public role: UserRole;
  public email: string;
  public mobileNumber: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
  public language: string;
  public acl: string[] = [];
  public deletedAt?: Date;

  public status: UserStatus = UserStatus.DRAFT;

  public block(): void {
    if (this.status === UserStatus.BLOCKED) return;
    this.status = UserStatus.BLOCKED;
  }

  public isEmailVerified(): boolean {
    return User.EMAIL_VERIFIED_STATUSES.has(this.status);
  }

  public isPhoneVerified(): boolean {
    return User.PHONE_VERIFIED_STATUSES.has(this.status);
  }

  public verifyEmail(): void {
    if (this.isEmailVerified()) return;
    if (this.status !== UserStatus.DRAFT && this.status !== UserStatus.WAITING_EMAIL_VERIFICATION) {
      throw new Error(`Cannot verify email when status is ${this.status}`);
    }

    this.status = UserStatus.WAITING_PHONE_VERIFICATION;
  }

  public softDelete(): void {
    this.deletedAt = new Date();
  }

  public isDeleted(): boolean {
    return Boolean(this.deletedAt);
  }
}
