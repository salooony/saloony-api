import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPhoneVerificationTemplate1771499904483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    void queryRunner;
    // No-op: phone_verification is already seeded by the initial templates migration.
    await Promise.resolve();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    void queryRunner;
    // No-op to preserve the initial phone_verification template.
    await Promise.resolve();
  }
}
