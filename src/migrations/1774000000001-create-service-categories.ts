import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServiceCategories1774000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_categories',
        columns: [
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isPrimary: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'activated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'deactivated_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Seed the initial categories
    await queryRunner.query(`
      INSERT INTO service_categories (name, is_active, activated_at) VALUES
        ('hair', true, now()),
        ('beard', true, now()),
        ('nails', true, now()),
        ('skincare', true, now()),
        ('makeup', true, now()),
        ('other', true, now())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service_categories');
  }
}
