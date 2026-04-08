import { MigrationInterface, QueryRunner } from 'typeorm';

export class NormalizeCountryCodesToAlpha31773662400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const incompatibleCodes = (await queryRunner.query(`
      SELECT code
      FROM countries
      WHERE char_length(code) <> 3
        AND code NOT IN ('TN', 'PS')
    `)) as Array<{ code: string }>;

    if (incompatibleCodes.length > 0) {
      const codes = incompatibleCodes.map((row: { code: string }) => row.code).join(', ');
      throw new Error(`Cannot normalize country codes to ISO alpha-3 automatically. Unsupported codes: ${codes}`);
    }

    await queryRunner.query(`
      UPDATE countries
      SET code = CASE code
        WHEN 'TN' THEN 'TUN'
        WHEN 'PS' THEN 'PSE'
        ELSE code
      END
    `);

    await queryRunner.query(`
      ALTER TABLE countries
      ALTER COLUMN code TYPE varchar(3)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE countries
      SET code = CASE code
        WHEN 'TUN' THEN 'TN'
        WHEN 'PSE' THEN 'PS'
        ELSE code
      END
    `);

    await queryRunner.query(`
      ALTER TABLE countries
      ALTER COLUMN code TYPE varchar(5)
    `);
  }
}
