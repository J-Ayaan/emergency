import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHospitalStatus1747150062788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE hospital_status (
                id INT NOT NULL AUTO_INCREMENT,
                timestamp TIMESTAMP NOT NULL,
                totalHospitals INT NOT NULL,
                activeHospitals INT NOT NULL,
                totalBeds JSON NOT NULL,
                availableBeds JSON NOT NULL,
                bedTypes JSON NOT NULL,
                severeIllness JSON NOT NULL,
                ambulance JSON NOT NULL,
                summary JSON NOT NULL,
                createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE hospital_status`);
    }

}
