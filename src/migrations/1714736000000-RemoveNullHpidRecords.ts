import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveNullHpidRecords1714736000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // hpid가 null인 레코드 삭제
        await queryRunner.query(`
            DELETE FROM hospital_info 
            WHERE hpid IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 롤백 로직이 필요한 경우 여기에 작성
    }
} 