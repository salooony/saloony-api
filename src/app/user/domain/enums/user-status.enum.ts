export enum UserStatus {
  PENDING = 'pending',
  WAITING_EMAIL_VERIFICATION = 'waiting email verification',
  WAITING_PHONE_VERIFICATION = 'waiting phone verification',
  WAITING_OPERATOR_VALIDATION = 'waiting operator validation',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}
