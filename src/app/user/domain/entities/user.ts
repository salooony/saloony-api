import { UserStatus } from '../enums/user-status.enum';

export class User {
  public id: string;
  public firstname: string;
  public lastname: string;
  public avatar: string;
  public birthdate: Date;
  public role: string;
  public email: string;
  public mobileNumber: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
  public language: string;
  public acl: string[] = [];
  public deletedAt?: Date;

  public status: UserStatus = UserStatus.PENDING;
  public emailVerified: boolean = false;
  public phoneVerified: boolean = false;
  public operatorValidated: boolean = false;

  public updateStatus(): void {
    if (this.status === UserStatus.BLOCKED) return;

    if (this.emailVerified && this.phoneVerified) {
      if (this.operatorValidated) {
        this.status = UserStatus.ACTIVE;
      } else {
        this.status = UserStatus.WAITING_OPERATOR_VALIDATION;
      }
    } else if (this.emailVerified) {
      this.status = UserStatus.WAITING_PHONE_VERIFICATION;
    } else if (this.phoneVerified) {
      this.status = UserStatus.WAITING_EMAIL_VERIFICATION;
    } else {
      this.status = UserStatus.PENDING;
    }
  }

  public block(): void {
    this.status = UserStatus.BLOCKED;
  }
}
