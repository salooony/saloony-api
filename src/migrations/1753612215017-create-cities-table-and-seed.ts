import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCitiesTableAndSeed1753612215017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create cities table with country_id FK
    await queryRunner.createTable(
      new Table({
        name: 'cities',
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
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'country_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
        // Ensure no two cities with the same name exist in the same country
        uniques: [
          {
            name: 'UQ_CITIES_COUNTRY_ID_NAME',
            columnNames: ['country_id', 'name'],
          },
        ],
      }),
    );

    // Add FK constraint to countries table
    await queryRunner.createForeignKey(
      'cities',
      new TableForeignKey({
        name: 'FK_CITIES_COUNTRIES_COUNTRY_ID',
        columnNames: ['country_id'],
        referencedTableName: 'countries',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Seed Tunisian cities
    await queryRunner.query(`
      INSERT INTO "cities" (name, country_id, created_at, updated_at) VALUES
      ('Tunis', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Sfax', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Sousse', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Kairouan', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Gabes', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Djerba', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Tozeur', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Monastir', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Nabeul', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Mahdia', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Gafsa', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Jendouba', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Kebili', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW()),
      ('Kasserine', (SELECT id FROM countries WHERE code = 'TN'), NOW(), NOW())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key from city table
    const cityTable = await queryRunner.getTable('cities');
    const cityForeignKey = cityTable?.foreignKeys.find((fk) => fk.columnNames.includes('country_id'));
    if (cityForeignKey) {
      await queryRunner.dropForeignKey('cities', cityForeignKey);
    }

    // Drop city table
    await queryRunner.dropTable('cities');
  }
}
