import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateHospitalInfoMessages1746291744591 implements MigrationInterface {
    name = 'UpdateHospitalInfoMessages1746291744591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`symBlkEndDtm\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`symBlkMsg\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`symBlkMsgTyp\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`symBlkSttDtm\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`symOutDspMth\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`symOutDspYon\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`symTypCod\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`symTypCodMag\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`messages\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`hpid\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`hpid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`dutyName\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`dutyName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`dutyTel3\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`dutyTel3\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`hvidate\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`hvidate\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`hvidate\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`hvidate\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`dutyTel3\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`dutyTel3\` varchar(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`dutyName\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`dutyName\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`hpid\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`hpid\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` DROP COLUMN \`messages\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`symTypCodMag\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`symTypCod\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`symOutDspYon\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`symOutDspMth\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`symBlkSttDtm\` varchar(14) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`symBlkMsgTyp\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`symBlkMsg\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` ADD \`symBlkEndDtm\` varchar(14) NULL`);
    }

}
