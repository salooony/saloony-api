import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from 'typeorm';

export class CreateSalonMemberships1769180000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'salon_memberships',
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
            type: 'int',
          },
          {
            name: 'role',
            type: 'varchar',
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
      'salon_memberships',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'salon_memberships',
      new TableForeignKey({
        columnNames: ['salon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'saloon',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createUniqueConstraint(
      'salon_memberships',
      new TableUnique({
        columnNames: ['user_id', 'salon_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('salon_memberships');
    if (table) {
      const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
      const foreignKeySalon = table.foreignKeys.find((fk) => fk.columnNames.indexOf('salon_id') !== -1);

      if (foreignKeyUser) await queryRunner.dropForeignKey('salon_memberships', foreignKeyUser);
      if (foreignKeySalon) await queryRunner.dropForeignKey('salon_memberships', foreignKeySalon);

      await queryRunner.dropTable('salon_memberships');
    }
  }
}
