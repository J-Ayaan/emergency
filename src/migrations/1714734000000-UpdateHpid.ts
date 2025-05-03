import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateHpid1714734000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE hospital_info 
            SET hpid = emcOrgCod 
            WHERE hpid IS NULL AND emcOrgCod IS NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 롤백 로직이 필요한 경우 여기에 작성
    }
} 