import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from 'typeorm';

export class CreateSalonMemberships1769180000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'salons_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'salon_id',
            type: 'uuid',
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['salon_admin', 'salon_operator', 'salon_staff'],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'salons_users',
      new TableForeignKey({
        name: 'FK_SALONS_USERS_USERS_USER_ID',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'salons_users',
      new TableForeignKey({
        name: 'FK_SALONS_USERS_SALONS_SALON_ID',
        columnNames: ['salon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'salons',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createUniqueConstraint(
      'salons_users',
      new TableUnique({
        name: 'UQ_SALONS_USERS_USER_ID_SALON_ID',
        columnNames: ['user_id', 'salon_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('salons_users');
    if (table) {
      const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
      const foreignKeySalon = table.foreignKeys.find((fk) => fk.columnNames.indexOf('salon_id') !== -1);

      if (foreignKeyUser) await queryRunner.dropForeignKey('salons_users', foreignKeyUser);
      if (foreignKeySalon) await queryRunner.dropForeignKey('salons_users', foreignKeySalon);

      await queryRunner.dropTable('salons_users');
    }
  }
}
