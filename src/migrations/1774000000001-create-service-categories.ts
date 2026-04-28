import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServiceCategories1774000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isUnique: true,
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

    // Seed the initial categories that were previously hardcoded in the enum
    await queryRunner.query(`
      INSERT INTO service_categories (name) VALUES
        ('hair'),
        ('beard'),
        ('nails'),
        ('skincare'),
        ('hair_removal'),
        ('brows_lashes'),
        ('makeup'),
        ('other')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service_categories');
  }
}
