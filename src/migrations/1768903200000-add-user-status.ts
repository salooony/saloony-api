import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';
import { UserStatus } from '../app/user/domain/enums/user-status.enum';

export class AddUserStatus1768903200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const statusValues = Object.values(UserStatus)
      .map((v) => `'${v}'`)
      .join(', ');

    // Create User Status Enum Type
    await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM(${statusValues})`);

    // Add status column to 'users' table
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: Object.values(UserStatus),
        enumName: 'user_status_enum',
        default: `'${UserStatus.PENDING}'`,
      }),
    );

    // Create Index
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_STATUS',
        columnNames: ['status'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'IDX_USER_STATUS');
    await queryRunner.dropColumn('users', 'status');
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
  }
}
