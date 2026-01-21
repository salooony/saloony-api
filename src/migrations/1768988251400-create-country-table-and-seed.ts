import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCountryTableAndSeed1768988251400 implements MigrationInterface {
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
    await queryRunner.dropTable('country');
  }
}
