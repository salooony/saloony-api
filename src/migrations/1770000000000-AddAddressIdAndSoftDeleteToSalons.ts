import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

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

    // Add is_deleted column for boolean flag
    await queryRunner.addColumn(
      'salons',
      new TableColumn({
        name: 'is_deleted',
        type: 'boolean',
        default: false,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('salons');
    if (table) {
      // Drop Foreign Key
      const foreignKey = table.foreignKeys.find((fk) => fk.name === 'FK_SALONS_ADDRESS_ID');
      if (foreignKey) await queryRunner.dropForeignKey('salons', foreignKey);

      // Drop Columns
      await queryRunner.dropColumn('salons', 'is_deleted');
      await queryRunner.dropColumn('salons', 'deleted_at');
      await queryRunner.dropColumn('salons', 'address_id');
    }
  }
}
