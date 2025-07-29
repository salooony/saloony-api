import { Roles } from '@app/user/domain/enums/roles.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1753612215016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
            enum: [...Object.values(Roles)],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'acl',
            type: 'varchar',
            isArray: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
