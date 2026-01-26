import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCitiesTableAndSeed1753612215018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
        ],
        uniques: [
          {
            name: 'UQ_CITIES_COUNTRY_ID_NAME',
            columnNames: ['country_id', 'name'],
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'cities',
      new TableForeignKey({
        name: 'FK_CITIES_COUNTRIES_COUNTRY_ID',
        columnNames: ['country_id'],
        referencedTableName: 'countries',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.query(`
      INSERT INTO cities (name, country_id) VALUES
      ('Tunis', (SELECT id FROM countries WHERE code = 'TN')),
      ('Sfax', (SELECT id FROM countries WHERE code = 'TN')),
      ('Sousse', (SELECT id FROM countries WHERE code = 'TN')),
      ('Kairouan', (SELECT id FROM countries WHERE code = 'TN')),
      ('Gabes', (SELECT id FROM countries WHERE code = 'TN')),
      ('Djerba', (SELECT id FROM countries WHERE code = 'TN')),
      ('Tozeur', (SELECT id FROM countries WHERE code = 'TN')),
      ('Monastir', (SELECT id FROM countries WHERE code = 'TN')),
      ('Nabeul', (SELECT id FROM countries WHERE code = 'TN')),
      ('Mahdia', (SELECT id FROM countries WHERE code = 'TN')),
      ('Gafsa', (SELECT id FROM countries WHERE code = 'TN')),
      ('Jendouba', (SELECT id FROM countries WHERE code = 'TN')),
      ('Kebili', (SELECT id FROM countries WHERE code = 'TN')),
      ('Kasserine', (SELECT id FROM countries WHERE code = 'TN')),
      ('Ramallah', (SELECT id FROM countries WHERE code = 'PS')),
      ('Gaza City', (SELECT id FROM countries WHERE code = 'PS')),
      ('Bethlehem', (SELECT id FROM countries WHERE code = 'PS')),
      ('Nablus', (SELECT id FROM countries WHERE code = 'PS')),
      ('Jericho', (SELECT id FROM countries WHERE code = 'PS')),
      ('Hebron', (SELECT id FROM countries WHERE code = 'PS')),
      ('Jenin', (SELECT id FROM countries WHERE code = 'PS')),
      ('Tulkarem', (SELECT id FROM countries WHERE code = 'PS')),
      ('Jerusalem', (SELECT id FROM countries WHERE code = 'PS'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const citiesTable = await queryRunner.getTable('cities');
    const citiesForeignKey = citiesTable?.foreignKeys.find((fk) => fk.columnNames.includes('country_id'));
    if (citiesForeignKey) {
      await queryRunner.dropForeignKey('cities', citiesForeignKey);
    }

    await queryRunner.dropTable('cities');
  }
}
