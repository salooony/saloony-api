import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTemplateIdAndUseCompositePk1774353610000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Drop the existing primary key constraint on 'id'
    // Note: TypeORM usually names the PK constraint as 'PK_[table_name]_id' or similar.
    // To be safe in PostgreSQL, we find the constraint name first or use direct SQL.
    await queryRunner.query(`
      ALTER TABLE "notification_templates" DROP CONSTRAINT IF EXISTS "PK_notification_templates_id";
      ALTER TABLE "notification_templates" DROP CONSTRAINT IF EXISTS "notification_templates_pkey";
    `);

    // 2. Add the new composite primary key
    await queryRunner.query(`
      ALTER TABLE "notification_templates" ADD PRIMARY KEY ("key", "type");
    `);

    // 3. Drop the 'id' column and add 'updatedAt' column
    await queryRunner.query(`
      ALTER TABLE "notification_templates" DROP COLUMN "id";
      ALTER TABLE "notification_templates" ADD COLUMN "updatedAt" timestamp DEFAULT now();
    `);

    // 4. Drop the old UNIQUE constraint on 'key' if it exists
    await queryRunner.query(`
      ALTER TABLE "notification_templates" DROP CONSTRAINT IF EXISTS "UQ_notification_templates_key";
      ALTER TABLE "notification_templates" DROP CONSTRAINT IF EXISTS "notification_templates_key_key";
    `);

    // 5. Drop the old composite UNIQUE constraint if it exists (since it's now redundant with the PK)
    await queryRunner.query(`
      ALTER TABLE "notification_templates" DROP CONSTRAINT IF EXISTS "UQ_notification_templates_key_type";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // This migration is irreversible.
    await Promise.resolve(queryRunner);
  }
}
