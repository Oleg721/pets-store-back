import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeEnumForAttributeName1716371962842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TYPE "attributes_type_enum" AS ENUM ('string', 'numeric', 'date')
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TYPE "attributes_type_enum"
    `);
    }

}
