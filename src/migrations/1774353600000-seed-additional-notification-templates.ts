import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdditionalNotificationTemplates1774353600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO notification_templates (key, type, title, message, "defaultParameters")
      VALUES
        (
          'forgot_password',
          'security',
          'Reset your Saloony password',
          'Hello {{firstName}}, we received a request to reset your password. Use this code to continue: {{code}}',
          '{"firstName": "Guest", "code": "000000"}'
        ),
        (
          'reset_password',
          'security',
          'Your password has been reset',
          'Hello {{firstName}}, your password has been reset successfully. If this was not you, please contact support immediately.',
          '{"firstName": "Guest"}'
        ),
        (
          'welcome',
          'system',
          'Welcome to Saloony',
          'Hello {{firstName}}, welcome to Saloony. We are glad to have you with us.',
          '{"firstName": "Guest"}'
        )
      ON CONFLICT (key) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM notification_templates
      WHERE key IN ('forgot_password', 'reset_password', 'welcome');
    `);
  }
}
