import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTokensTable202601171300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'token',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'expired_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'is_hashed',
            type: 'boolean',
            default: false,
          },
          {
            name: 'owner_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    // ✅ Add FK constraint for owner_id
    await queryRunner.query(`
      ALTER TABLE tokens
      ADD CONSTRAINT FK_TOKENS_USERS_OWNER_ID
      FOREIGN KEY (owner_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
