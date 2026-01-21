import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCityTableAndSeed1768988251401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'city',
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
        ],
        uniques: [
          {
            name: 'UQ_CITY_COUNTRY_ID_NAME',
            columnNames: ['country_id', 'name'],
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'city',
      new TableForeignKey({
        name: 'FK_CITY_COUNTRY_COUNTRY_ID',
        columnNames: ['country_id'],
        referencedTableName: 'country',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.query(`
      INSERT INTO city (name, country_id) VALUES
      ('Tunis', (SELECT id FROM country WHERE code = 'TN')),
      ('Sfax', (SELECT id FROM country WHERE code = 'TN')),
      ('Sousse', (SELECT id FROM country WHERE code = 'TN')),
      ('Kairouan', (SELECT id FROM country WHERE code = 'TN')),
      ('Gabes', (SELECT id FROM country WHERE code = 'TN')),
      ('Djerba', (SELECT id FROM country WHERE code = 'TN')),
      ('Tozeur', (SELECT id FROM country WHERE code = 'TN')),
      ('Monastir', (SELECT id FROM country WHERE code = 'TN')),
      ('Nabeul', (SELECT id FROM country WHERE code = 'TN')),
      ('Mahdia', (SELECT id FROM country WHERE code = 'TN')),
      ('Gafsa', (SELECT id FROM country WHERE code = 'TN')),
      ('Jendouba', (SELECT id FROM country WHERE code = 'TN')),
      ('Kebili', (SELECT id FROM country WHERE code = 'TN')),
      ('Kasserine', (SELECT id FROM country WHERE code = 'TN')),
      ('Ramallah', (SELECT id FROM country WHERE code = 'PS')),
      ('Gaza City', (SELECT id FROM country WHERE code = 'PS')),
      ('Bethlehem', (SELECT id FROM country WHERE code = 'PS')),
      ('Nablus', (SELECT id FROM country WHERE code = 'PS')),
      ('Jericho', (SELECT id FROM country WHERE code = 'PS')),
      ('Hebron', (SELECT id FROM country WHERE code = 'PS')),
      ('Jenin', (SELECT id FROM country WHERE code = 'PS')),
      ('Tulkarem', (SELECT id FROM country WHERE code = 'PS')),
      ('Jerusalem', (SELECT id FROM country WHERE code = 'PS'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const cityTable = await queryRunner.getTable('city');
    const cityForeignKey = cityTable?.foreignKeys.find((fk) => fk.columnNames.includes('country_id'));
    if (cityForeignKey) {
      await queryRunner.dropForeignKey('city', cityForeignKey);
    }

    await queryRunner.dropTable('city');
  }
}
