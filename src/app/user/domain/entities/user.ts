import { UserStatus } from '../enums/user-status.enum';
import { UserRole } from '../enums/user-role.enum';

export class User {
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

  public status: UserStatus = UserStatus.PENDING;

  public block(): void {
    this.status = UserStatus.BLOCKED;
  }

  public isEmailVerified(): boolean {
    return [
      UserStatus.WAITING_PHONE_VERIFICATION,
      UserStatus.WAITING_OPERATOR_VALIDATION,
      UserStatus.ACTIVE,
      UserStatus.BLOCKED,
    ].includes(this.status);
  }

  public isPhoneVerified(): boolean {
    return [UserStatus.WAITING_OPERATOR_VALIDATION, UserStatus.ACTIVE, UserStatus.BLOCKED].includes(this.status);
  }
}
