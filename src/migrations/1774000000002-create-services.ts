import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateServices1774000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [
          {
            name: 'name',
            type: 'varchar',
            length: '150',
            isPrimary: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000',
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'activated_at',
            type: 'timestamp',
            default: 'now()',
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
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'services',
      new TableForeignKey({
        columnNames: ['category'],
        referencedColumnNames: ['name'],
        referencedTableName: 'service_categories',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('services');
  }
}
