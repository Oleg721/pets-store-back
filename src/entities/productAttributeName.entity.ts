import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { CategoryAttribute } from './categoryAttribute.entity';
import { Product } from './product.entity';

@Entity('ProductAttributeNames')
export class ProductAttributeName extends BaseEntity {
	@Column()
	value: string;

	@ManyToOne(() => CategoryAttribute, (categoryAttribute) => categoryAttribute.productAttributeNames)
	categoryAttribute: CategoryAttribute;

	@ManyToOne(
		() => Product,
		(product) => product.productAttributeName
	)
	product: Product;
}
