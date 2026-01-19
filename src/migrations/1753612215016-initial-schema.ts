import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { UserStatus } from '../app/user/domain/enums/user-status.enum';

export class InitialSchema1753612215016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const statusValues = Object.values(UserStatus)
      .map((v) => `'${v}'`)
      .join(', ');

    // Create User Status Enum Type
    await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM(${statusValues})`);

    // Create User Table
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            name: 'firstname',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'lastname',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'birthdate',
            type: 'date',
          },
          {
            name: 'avatar',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'mobile_number',
            type: 'varchar',
            length: '15',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '512',
          },
          {
            name: 'language',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'role',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(UserStatus),
            enumName: 'user_status_enum',
            default: `'${UserStatus.PENDING}'`,
          },
          {
            name: 'email_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'phone_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'operator_validated',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
          },
          {
            name: 'acl',
            type: 'varchar',
            isArray: true,
          },
        ],
      }),
    );

    // Create Index for Status
    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_STATUS',
        columnNames: ['status'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user', 'IDX_USER_STATUS');
    await queryRunner.dropTable('user');
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
  }
}
