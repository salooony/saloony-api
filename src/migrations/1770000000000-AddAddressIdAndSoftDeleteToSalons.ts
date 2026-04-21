import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAddressIdAndSoftDeleteToSalons1770000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('salons', [
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'is_deleted',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('salons', ['deleted_at', 'is_deleted', 'address_id']);
  }
}
