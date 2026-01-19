import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RenameUserToUsersAndAddSoftDelete1768460174015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user', 'users');

    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'deleted_at');
    await queryRunner.renameTable('users', 'user');
  }
}
