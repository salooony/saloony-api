import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1752713855262 implements MigrationInterface {
  name = 'Migration1752713855262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "saloon" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(1000), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7710932ae3ccfdd41990e482f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."user_saloon_role_enum" AS ENUM('Owner')`);
    await queryRunner.query(
      `CREATE TABLE "user_saloon" ("id" SERIAL NOT NULL, "role" "public"."user_saloon_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "saloon_id" integer, CONSTRAINT "PK_4374df041b51a2a433b28ddbdbf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('Client', 'Saloon User')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, "birthdate" date NOT NULL, "avatar" character varying(100), "email" character varying(50) NOT NULL, "mobile_number" character varying(15) NOT NULL, "password" character varying(100) NOT NULL, "language" character varying(50) NOT NULL, "role" "public"."user_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_9d6d873483c7fae39567c209192" UNIQUE ("mobile_number"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_saloon" ADD CONSTRAINT "FK_b2844a552222bf577f2b3a664e5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_saloon" ADD CONSTRAINT "FK_39f809858af7486b10bfa7c1e6a" FOREIGN KEY ("saloon_id") REFERENCES "saloon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_saloon" DROP CONSTRAINT "FK_39f809858af7486b10bfa7c1e6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_saloon" DROP CONSTRAINT "FK_b2844a552222bf577f2b3a664e5"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "user_saloon"`);
    await queryRunner.query(`DROP TYPE "public"."user_saloon_role_enum"`);
    await queryRunner.query(`DROP TABLE "saloon"`);
  }
}
