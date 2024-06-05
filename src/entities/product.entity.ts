import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { ProductAttributeName } from './productAttributeName.entity';

export enum ProductStatus {
	AVAILABLE = 'available',
	RESERVED = 'reserved', // don't show to the user
	SOLD = 'sold',
	MODERATING = 'moderating',
}

@Entity('Products')
export class Product extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@Column({
		type: 'enum',
		enum: ProductStatus,
		default: ProductStatus.AVAILABLE,
	})
	status: ProductStatus;

	@Column('double precision')
	price: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdat: Date;

	@Column()
	categoryId: number;

	@ManyToOne(() => Category, (category) => category.products, {
		onDelete: 'CASCADE',
		cascade: ['update'],
	})
	category: Category;

	@OneToMany(
		() => ProductAttributeName,
		(productAttributeName) => productAttributeName.product
	)
	productAttributeNames: ProductAttributeName[];

	// @JoinTable()
	// categories: Category[]
}
