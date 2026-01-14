import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCountriesTableAndSeed1736693000000 implements MigrationInterface {
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
        ],
      }),
    );

    // 2️⃣ Seed initial countries
    await queryRunner.query(`
      INSERT INTO countries (code, icon, name)
      VALUES
        ('PS', '🇵🇸', 'Palestine'),
        ('TN', '🇹🇳', 'Tunisia')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback
    await queryRunner.dropTable('countries');
  }
}
