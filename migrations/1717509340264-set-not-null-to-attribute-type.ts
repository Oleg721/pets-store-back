import { MigrationInterface, QueryRunner } from "typeorm";

export class SetNotNullToAttributeType1717509340264 implements MigrationInterface {
    name = 'SetNotNullToAttributeType1717509340264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttributeNames" ALTER COLUMN "type" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttributeNames" ALTER COLUMN "type" DROP NOT NULL`);
    }

}
