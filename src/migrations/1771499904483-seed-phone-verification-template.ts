import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPhoneVerificationTemplate1771499904483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO notification_templates (key, type, title, message, is_active, created_at, updated_at)
      VALUES (
        'phone_verification',
        'security',
        'Phone Verification Code',
        'Your verification code is: {{code}}',
        true,
        NOW(),
        NOW()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM notification_templates
      WHERE key = 'phone_verification'
    `);
  }
}
