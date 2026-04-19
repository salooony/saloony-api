import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddAddressIdAndSoftDeleteToSalons1770000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add address_id column
    await queryRunner.addColumn(
      'salons',
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Add deleted_at column for soft delete
    await queryRunner.addColumn(
      'salons',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );

    // Add Foreign Key to addresses table
    await queryRunner.createForeignKey(
      'salons',
      new TableForeignKey({
        name: 'FK_SALONS_ADDRESS_ID',
        columnNames: ['address_id'],
        referencedTableName: 'addresses',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // Add Index for address_id
    await queryRunner.createIndex(
      'salons',
      new TableIndex({
        name: 'idx_salon_address_id',
        columnNames: ['address_id'],
      }),
    );

    // Add Index for name (as requested for performance)
    await queryRunner.createIndex(
      'salons',
      new TableIndex({
        name: 'idx_salon_name',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('salons');
    if (table) {
      // Drop Indexes
      const nameIndex = table.indices.find((index) => index.name === 'idx_salon_name');
      if (nameIndex) await queryRunner.dropIndex('salons', nameIndex);

      const addressIdIndex = table.indices.find((index) => index.name === 'idx_salon_address_id');
      if (addressIdIndex) await queryRunner.dropIndex('salons', addressIdIndex);

      // Drop Foreign Key
      const foreignKey = table.foreignKeys.find((fk) => fk.name === 'FK_SALONS_ADDRESS_ID');
      if (foreignKey) await queryRunner.dropForeignKey('salons', foreignKey);

      // Drop Columns
      await queryRunner.dropColumn('salons', 'deleted_at');
      await queryRunner.dropColumn('salons', 'address_id');
    }
  }
}
