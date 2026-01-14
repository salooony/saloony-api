import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAclAndDeletedAtToUsers1753612300000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'acl',
        type: 'varchar',
        isArray: true,
        isNullable: true, // or default if preferred
      }),
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'acl');
    await queryRunner.dropColumn('users', 'deleted_at');
  }
}
