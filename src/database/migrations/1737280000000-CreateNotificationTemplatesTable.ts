import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

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
            name: 'type',
            type: 'enum',
            enum: ['appointment', 'marketing', 'security', 'system'],
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
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
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
      }),
      true,
    );

    // Create index on key for faster lookups
    await queryRunner.createIndex(
      'notification_templates',
      new TableIndex({
        name: 'IDX_TEMPLATE_KEY',
        columnNames: ['key'],
      }),
    );

    // Create index on type for filtering
    await queryRunner.createIndex(
      'notification_templates',
      new TableIndex({
        name: 'IDX_TEMPLATE_TYPE',
        columnNames: ['type'],
      }),
    );

    // Seed initial templates
    await queryRunner.query(`
      INSERT INTO notification_templates (key, type, title, message, "defaultParameters", metadata, "isActive")
      VALUES
        (
          'app_booked_success',
          'appointment',
          'Appointment Booked Successfully',
          'Your appointment has been booked for {{date}} at {{time}}. Salon: {{salonName}}',
          '{"date": "TBD", "time": "TBD", "salonName": "Salon"}',
          '{"priority": "high", "channel": "push"}',
          true
        ),
        (
          'app_cancelled_by_salon',
          'appointment',
          'Appointment Cancelled',
          'Unfortunately, your appointment at {{salonName}} on {{date}} has been cancelled. Reason: {{reason}}',
          '{"salonName": "Salon", "date": "TBD", "reason": "Not specified"}',
          '{"priority": "high", "channel": "push"}',
          true
        ),
        (
          'app_reminder',
          'appointment',
          'Appointment Reminder',
          'Reminder: You have an appointment tomorrow at {{time}} with {{salonName}}',
          '{"time": "TBD", "salonName": "Salon"}',
          '{"priority": "medium", "channel": "push"}',
          true
        ),
        (
          'new_offer_alert',
          'marketing',
          'New Offer Available!',
          'Check out our new offer: {{offerTitle}}. Valid until {{expiryDate}}',
          '{"offerTitle": "Special Offer", "expiryDate": "TBD"}',
          '{"priority": "low", "channel": "push"}',
          true
        ),
        (
          'promotion_discount',
          'marketing',
          'Special Discount for You!',
          'Get {{discount}}% off on your next booking! Use code: {{promoCode}}',
          '{"discount": "10", "promoCode": "SAVE10"}',
          '{"priority": "low", "channel": "push"}',
          true
        ),
        (
          'welcome_new_user',
          'system',
          'Welcome to Saloony!',
          'Hello {{userName}}, welcome to Saloony! Discover the best salons near you.',
          '{"userName": "Guest"}',
          '{"priority": "medium", "channel": "push"}',
          true
        ),
        (
          'system_alert',
          'system',
          'System Alert',
          'Important: {{message}}',
          '{"message": "System notification"}',
          '{"priority": "high", "channel": "push"}',
          true
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('notification_templates', 'IDX_TEMPLATE_TYPE');
    await queryRunner.dropIndex('notification_templates', 'IDX_TEMPLATE_KEY');
    await queryRunner.dropTable('notification_templates');
  }
}
