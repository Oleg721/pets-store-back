import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1716223150888 implements MigrationInterface {
    name = 'InitDb1716223150888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying, "email" character varying NOT NULL, "hashedpassword" character varying NOT NULL, "role" "public"."Users_role_enum" NOT NULL DEFAULT 'user', "status" character varying NOT NULL, "createdat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."Products_status_enum" NOT NULL DEFAULT 'available', "price" double precision NOT NULL, "createdat" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer NOT NULL, CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "parentId" integer, CONSTRAINT "UQ_9004ab74b495518b3dee4f4222a" UNIQUE ("name"), CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AttributeNames" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "UQ_6d0ab304ccd32f7c37532120076" UNIQUE ("name"), CONSTRAINT "PK_ef02b709300eef7332ec227cf46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CategoryAttributes" ("id" SERIAL NOT NULL, "categoryId" integer NOT NULL, "attributeNameId" integer NOT NULL, CONSTRAINT "PK_b6a830f2bec3f50455ca4eed014" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ProductAttributeNames" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "productId" integer NOT NULL, "categoryAttributeId" integer NOT NULL, CONSTRAINT "PK_89af3b6898dec928c5f986c041c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_85fdee89fa67fcdce66863def29" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_1eabf8acaf25797323ad4cecc9d" FOREIGN KEY ("parentId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CategoryAttributes" ADD CONSTRAINT "FK_9fd7b3add82de759e1499e6382b" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CategoryAttributes" ADD CONSTRAINT "FK_8db0d84d7c9b5156968153eb0a8" FOREIGN KEY ("attributeNameId") REFERENCES "AttributeNames"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ProductAttributeNames" ADD CONSTRAINT "FK_f5625850cb9ef2926f06fe72882" FOREIGN KEY ("categoryAttributeId") REFERENCES "CategoryAttributes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ProductAttributeNames" ADD CONSTRAINT "FK_7f205bb53b5f8fb18d2e7d38dc1" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProductAttributeNames" DROP CONSTRAINT "FK_7f205bb53b5f8fb18d2e7d38dc1"`);
        await queryRunner.query(`ALTER TABLE "ProductAttributeNames" DROP CONSTRAINT "FK_f5625850cb9ef2926f06fe72882"`);
        await queryRunner.query(`ALTER TABLE "CategoryAttributes" DROP CONSTRAINT "FK_8db0d84d7c9b5156968153eb0a8"`);
        await queryRunner.query(`ALTER TABLE "CategoryAttributes" DROP CONSTRAINT "FK_9fd7b3add82de759e1499e6382b"`);
        await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_1eabf8acaf25797323ad4cecc9d"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_85fdee89fa67fcdce66863def29"`);
        await queryRunner.query(`DROP TABLE "ProductAttributeNames"`);
        await queryRunner.query(`DROP TABLE "CategoryAttributes"`);
        await queryRunner.query(`DROP TABLE "AttributeNames"`);
        await queryRunner.query(`DROP TABLE "Categories"`);
        await queryRunner.query(`DROP TABLE "Products"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
