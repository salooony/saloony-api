import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAddressesTable1768988251402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
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
            name: 'location',
            type: 'jsonb',
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
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
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
      'addresses',
      new TableForeignKey({
        name: 'FK_ADDRESSES_CITY_CITY_ID',
        columnNames: ['city_id'],
        referencedTableName: 'city',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const addressesTable = await queryRunner.getTable('addresses');
    const addressesForeignKey = addressesTable?.foreignKeys.find((fk) =>
      fk.columnNames.includes('city_id'),
    );
    if (addressesForeignKey) {
      await queryRunner.dropForeignKey('addresses', addressesForeignKey);
    }

    await queryRunner.dropTable('addresses');
  }
}
