import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValuesForMKioskTypes1746291937670 implements MigrationInterface {
    name = 'AddDefaultValuesForMKioskTypes1746291937670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy1\` \`MKioskTy1\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy2\` \`MKioskTy2\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy3\` \`MKioskTy3\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy4\` \`MKioskTy4\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy5\` \`MKioskTy5\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy6\` \`MKioskTy6\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy7\` \`MKioskTy7\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy8\` \`MKioskTy8\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy9\` \`MKioskTy9\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy10\` \`MKioskTy10\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy11\` \`MKioskTy11\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy12\` \`MKioskTy12\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy13\` \`MKioskTy13\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy14\` \`MKioskTy14\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy15\` \`MKioskTy15\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy16\` \`MKioskTy16\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy17\` \`MKioskTy17\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy18\` \`MKioskTy18\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy19\` \`MKioskTy19\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy20\` \`MKioskTy20\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy21\` \`MKioskTy21\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy22\` \`MKioskTy22\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy23\` \`MKioskTy23\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy24\` \`MKioskTy24\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy25\` \`MKioskTy25\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy26\` \`MKioskTy26\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy27\` \`MKioskTy27\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy28\` \`MKioskTy28\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy28\` \`MKioskTy28\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy27\` \`MKioskTy27\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy26\` \`MKioskTy26\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy25\` \`MKioskTy25\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy24\` \`MKioskTy24\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy23\` \`MKioskTy23\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy22\` \`MKioskTy22\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy21\` \`MKioskTy21\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy20\` \`MKioskTy20\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy19\` \`MKioskTy19\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy18\` \`MKioskTy18\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy17\` \`MKioskTy17\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy16\` \`MKioskTy16\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy15\` \`MKioskTy15\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy14\` \`MKioskTy14\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy13\` \`MKioskTy13\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy12\` \`MKioskTy12\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy11\` \`MKioskTy11\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy10\` \`MKioskTy10\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy9\` \`MKioskTy9\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy8\` \`MKioskTy8\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy7\` \`MKioskTy7\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy6\` \`MKioskTy6\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy5\` \`MKioskTy5\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy4\` \`MKioskTy4\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy3\` \`MKioskTy3\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy2\` \`MKioskTy2\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`MKioskTy1\` \`MKioskTy1\` tinyint NOT NULL`);
    }

}
