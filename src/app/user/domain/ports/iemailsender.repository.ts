export interface IEmailSender {
  sendResetEmail(to: string, resetLink: string): Promise<void>;
}
