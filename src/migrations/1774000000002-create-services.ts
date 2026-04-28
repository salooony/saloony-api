import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateServices1774000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000',
            isNullable: true,
          },
          {
            name: 'category_id',
            type: 'uuid',
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
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'service_categories',
        onDelete: 'RESTRICT',
      }),
    );

    // Salon and Service M2M relationship with extra data (Price)
    await queryRunner.createTable(
      new Table({
        name: 'salon_services',
        columns: [
          {
            name: 'salon_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'service_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true, // Nullable initially to allow linking without price
          },
          {
            name: 'currency',
            type: 'varchar',
            length: '3',
            default: "'USD'",
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'salon_services',
      new TableForeignKey({
        columnNames: ['service_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'services',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'salon_services',
      new TableForeignKey({
        columnNames: ['salon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'salons',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('salon_services');
    await queryRunner.dropTable('services');
  }
}
