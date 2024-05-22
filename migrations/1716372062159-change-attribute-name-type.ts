import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAttributeNameType1716372062159
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        ALTER TABLE "AttributeNames" RENAME COLUMN "type" TO "type_old"
    `);

		await queryRunner.query(`
        ALTER TABLE "AttributeNames"
        ADD COLUMN "type" "attributes_type_enum"
    `);

		await queryRunner.query(`
        UPDATE "AttributeNames"
        SET "type" = "type_old"::"attributes_type_enum"
    `);

		await queryRunner.query(`
        ALTER TABLE "AttributeNames"
        DROP COLUMN "type_old"
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "AttributeNames"
            ADD COLUMN "type_old" character varying
        `);

        await queryRunner.query(`
            UPDATE "AttributeNames"
            SET "type_old" = "type"::text
        `);

        await queryRunner.query(`
            ALTER TABLE "AttributeNames"
            DROP COLUMN "type"
        `);

        await queryRunner.query(`
            ALTER TABLE "AttributeNames" RENAME COLUMN "type_old" TO "type"
        `);
    }
}
