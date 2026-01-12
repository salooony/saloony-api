import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAddressSchema1768217886619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'location',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'postcode',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'city_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'city',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('address');
    const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.indexOf('city_id') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('address', foreignKey);
    }
    await queryRunner.dropTable('address');
  }
}
