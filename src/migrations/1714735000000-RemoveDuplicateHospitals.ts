import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDuplicateHospitals1714735000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 중복된 hpid를 가진 레코드 중 가장 오래된 레코드만 유지
        await queryRunner.query(`
            DELETE h1 FROM hospital_info h1
            INNER JOIN hospital_info h2
            WHERE h1.hpid IS NOT NULL
            AND h1.hpid = h2.hpid
            AND h1.id > h2.id;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 롤백 로직이 필요한 경우 여기에 작성
    }
} 