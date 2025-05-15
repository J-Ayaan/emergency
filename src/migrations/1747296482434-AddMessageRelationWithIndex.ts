import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessageRelationWithIndex1747296482434 implements MigrationInterface {
    name = 'AddMessageRelationWithIndex1747296482434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`hpid\` \`hpid\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_37a117086f8bbe7abf886516f1\` ON \`hospital_info\` (\`hpid\`)`);
        await queryRunner.query(`ALTER TABLE \`emergency_message\` ADD CONSTRAINT \`FK_6966ab41f6d24957b0d717d83bd\` FOREIGN KEY (\`hpid\`) REFERENCES \`hospital_info\`(\`hpid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`emergency_message\` DROP FOREIGN KEY \`FK_6966ab41f6d24957b0d717d83bd\``);
        await queryRunner.query(`DROP INDEX \`IDX_37a117086f8bbe7abf886516f1\` ON \`hospital_info\``);
        await queryRunner.query(`ALTER TABLE \`hospital_info\` CHANGE \`hpid\` \`hpid\` varchar(255) NULL`);
    }

}
