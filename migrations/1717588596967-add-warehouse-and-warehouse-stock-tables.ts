import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWarehouseAndWarehouseStockTables1717588596967 implements MigrationInterface {
    name = 'AddWarehouseAndWarehouseStockTables1717588596967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Warehouses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2d792962033e389d9f910a99c0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "WarehouseStocks" ("quantity" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" integer NOT NULL, "warehouseId" integer NOT NULL, CONSTRAINT "CHK_6bd92edfc2591b1a19d3496d2c" CHECK ("quantity" >= 0), CONSTRAINT "PK_86f1180413127c035f41242d1bf" PRIMARY KEY ("productId", "warehouseId"))`);
        await queryRunner.query(`ALTER TABLE "WarehouseStocks" ADD CONSTRAINT "FK_38a4477de4e1169ba63ca086141" FOREIGN KEY ("warehouseId") REFERENCES "Warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "WarehouseStocks" ADD CONSTRAINT "FK_565dd724c5fd9aaea269ce8e48e" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseStocks" DROP CONSTRAINT "FK_565dd724c5fd9aaea269ce8e48e"`);
        await queryRunner.query(`ALTER TABLE "WarehouseStocks" DROP CONSTRAINT "FK_38a4477de4e1169ba63ca086141"`);
        await queryRunner.query(`DROP TABLE "WarehouseStocks"`);
        await queryRunner.query(`DROP TABLE "Warehouses"`);
    }

}
