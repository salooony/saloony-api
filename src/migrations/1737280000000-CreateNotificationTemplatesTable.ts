import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNotificationTemplatesTable1737280000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_templates',
        columns: [
          {
            name: 'key',
            type: 'varchar',
            length: '255',
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '255',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'message',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'defaultParameters',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        uniques: [
          {
            name: 'UQ_notification_templates_key_type',
            columnNames: ['key', 'type'],
          },
        ],
      }),
      true,
    );

    // Add check constraint for type enum values
    await queryRunner.query(`
      ALTER TABLE "notification_templates" 
      ADD CONSTRAINT "CHK_notification_templates_type" 
      CHECK ("type" IN ('sms', 'email'))
    `);

    // Seed templates (Combining all from the seed-related migrations)
    await queryRunner.query(`
      INSERT INTO notification_templates (key, type, title, message, "defaultParameters")
      VALUES
        (
          'verify_email',
          'email',
          'Verify your Saloony email',
          'Hello {{firstName}}, use this verification code to verify your email address: {{code}}',
          '{"firstName": "Guest", "code": "000000"}'
        ),
        (
          'phone_verification',
          'sms',
          'Phone Verification',
          'Use this verification code to verify your phone number: {{code}}',
          '{"code": "000000"}'
        ),
        (
          'forgot_password',
          'email',
          'Reset your Saloony password',
          'Hello {{firstName}}, we received a request to reset your password. Use this code to continue: {{code}}',
          '{"firstName": "Guest", "code": "000000"}'
        ),
        (
          'reset_password',
          'email',
          'Your password has been reset',
          'Hello {{firstName}}, your password has been reset successfully. If this was not you, please contact support immediately.',
          '{"firstName": "Guest"}'
        ),
        (
          'welcome',
          'email',
          'Welcome to Saloony',
          'Hello {{firstName}}, welcome to Saloony. We are glad to have you with us.',
          '{"firstName": "Guest"}'
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notification_templates');
  }
}
