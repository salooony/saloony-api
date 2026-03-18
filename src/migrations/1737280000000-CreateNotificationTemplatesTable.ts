import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNotificationTemplatesTable1737280000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_templates',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'key',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
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
        ],
      }),
      true,
    );

    // Seed templates used by the current verification flows.
    await queryRunner.query(`
      INSERT INTO notification_templates (key, title, message, "defaultParameters")
      VALUES
        (
          'verify_email',
          'Verify your Saloony email',
          'Hello {{firstName}}, use this verification code to verify your email address: {{code}}',
          '{"firstName": "Guest", "code": "000000"}'
        ),
        (
          'phone_verification',
          'Phone Verification',
          'Use this verification code to verify your phone number: {{code}}',
          '{"code": "000000"}'
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notification_templates');
  }
}
