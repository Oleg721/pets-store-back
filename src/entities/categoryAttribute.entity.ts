import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { AttributeName } from './attributeName.entity';
import { ProductAttributeName } from './productAttributeName.entity';

@Entity('CategoryAttributes')
export class CategoryAttribute extends BaseEntity {
	@Column()
	categoryId: number;

	@Column()
	attributeNameId: number;

	@ManyToOne(() => Category, (category) => category.categoryAttributes)
	category: Category;

	@ManyToOne(
		() => AttributeName,
		(attributeName) => attributeName.categoryAttributes
	)
	attributeName: AttributeName;

	@OneToMany(() => ProductAttributeName, (pan) => pan.categoryAttribute)
	productAttributeNames: ProductAttributeName[];
}
