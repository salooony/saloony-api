import { MigrationInterface, QueryRunner, Table } from 'typeorm';

<<<<<<<< HEAD:src/migrations/1753612215017-create-countries-table-and-seed.ts
export class CreateCountriesTableAndSeed1753612215017 implements MigrationInterface {
========
export class CreateCountryTableAndSeed1768988251400 implements MigrationInterface {
>>>>>>>> 69a5ad0 (did the change in shemas s and recreated migrations so everything matched):src/migrations/1768988251400-create-country-table-and-seed.ts
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'country',
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
            isUnique: true,
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
            default: true,
          },
        ],
      }),
    );

    await queryRunner.query(`
      INSERT INTO country (code, icon, name, is_active)
      VALUES
        ('PS', '🇵🇸', 'Palestine', true),
        ('TN', '🇹🇳', 'Tunisia', true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
<<<<<<<< HEAD:src/migrations/1753612215017-create-countries-table-and-seed.ts
    await queryRunner.dropTable('countries');
========
    await queryRunner.dropTable('country');
>>>>>>>> 69a5ad0 (did the change in shemas s and recreated migrations so everything matched):src/migrations/1768988251400-create-country-table-and-seed.ts
  }
}
