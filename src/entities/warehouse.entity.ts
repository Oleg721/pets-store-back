import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { WarehouseStock } from './warehouseStock.entity';

@Entity('Warehouses')
export class Warehouse extends BaseEntity {
	@Column()
	name: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date | null;

	@OneToMany(() => WarehouseStock, (warehouseStock) => warehouseStock.warehouse)
	public warehouseStocks: WarehouseStock[];
}
