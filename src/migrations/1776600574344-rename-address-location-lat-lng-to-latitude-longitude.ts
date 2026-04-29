import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameAddressLocationLatLngToLatitudeLongitude1776600574344 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE addresses
      SET location = jsonb_build_object(
        'latitude', (location->>'lat')::float,
        'longitude', (location->>'lng')::float
      )
      WHERE location ? 'lat';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE addresses
      SET location = jsonb_build_object(
        'lat', (location->>'latitude')::float,
        'lng', (location->>'longitude')::float
      )
      WHERE location ? 'latitude';
    `);
  }
}
