import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCountriesTableAndSeed1753612215018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Create countries table
    await queryRunner.createTable(
      new Table({
        name: 'countries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '5',
            isNullable: false,
            isUnique: true, // ✅ unique constraint
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: true, // ✅ default value
          },
        ],
      }),
    );

    // 2️⃣ Seed initial countries
    await queryRunner.query(`
      INSERT INTO countries (code, icon, name, is_active)
      VALUES
        ('PS', '🇵🇸', 'Palestine', true),
        ('TN', '🇹🇳', 'Tunisia', true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback
    await queryRunner.dropTable('countries');
  }
}
