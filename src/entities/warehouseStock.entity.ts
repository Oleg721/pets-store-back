import { Check, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

@Entity('WarehouseStocks')
@Check(`"quantity" >= 0`)
export class WarehouseStock {
	@Column({
		default: 0,
		nullable: false,
		type: "int"
	})
	quantity: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
    deletedAt: Date | null;

	@PrimaryColumn()
	productId: number;

	@PrimaryColumn()
	warehouseId

	@ManyToOne(() => Warehouse, (warehouse) => warehouse.warehouseStocks)
	warehouse: Warehouse;

	@ManyToOne(
		() => Product,
		(product) => product.warehouseStocks
	)
	product: Product;
}
