import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class City20260107143100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create city table
    await queryRunner.createTable(
      new Table({
        name: 'city',
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
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
    );

    // Add city_id column to user table
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'city_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Add foreign key constraint for user.city_id
    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'city',
        onDelete: 'SET NULL',
      }),
    );

    // Seed Moroccan and French cities
    await queryRunner.query(`
      INSERT INTO "city" (name, created_at, updated_at) VALUES
      ('Casablanca', NOW(), NOW()),
      ('Rabat', NOW(), NOW()),
      ('Tangier', NOW(), NOW()),
      ('Marrakech', NOW(), NOW()),
      ('Fez', NOW(), NOW()),
      ('Agadir', NOW(), NOW()),
      ('Meknes', NOW(), NOW()),
      ('Paris', NOW(), NOW()),
      ('Lyon', NOW(), NOW()),
      ('Marseille', NOW(), NOW()),
      ('Toulouse', NOW(), NOW()),
      ('Nice', NOW(), NOW()),
      ('Nantes', NOW(), NOW()),
      ('Strasbourg', NOW(), NOW())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key from user table
    const userTable = await queryRunner.getTable('user');
    const userForeignKey = userTable?.foreignKeys.find((fk) => fk.columnNames.includes('city_id'));
    if (userForeignKey) {
      await queryRunner.dropForeignKey('user', userForeignKey);
    }

    // Drop city_id column from user
    await queryRunner.dropColumn('user', 'city_id');

    // Drop city table
    await queryRunner.dropTable('city');
  }
}
