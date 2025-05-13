import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoordinatesToHospitalInfo1747149341379 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE hospital_info
            ADD COLUMN wgs84Lon VARCHAR(30) NULL,
            ADD COLUMN wgs84Lat VARCHAR(20) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE hospital_info
            DROP COLUMN wgs84Lon,
            DROP COLUMN wgs84Lat;
        `);
    }

}
