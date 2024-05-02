import { Entity, Column, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { BaseEntity } from './base.entity';
import { CategoryAttribute } from './categoryAttribute.entity';

@Entity('AttributeNames')
export class AttributeName extends BaseEntity {
	@Column({
		unique: true,
	})
	@IsNotEmpty()
	name: string;

	@Column()
	@IsNotEmpty()
	type: string;

	@OneToMany(
		() => CategoryAttribute,
		(categoryAttribute) => categoryAttribute.attributeName
	)
	categoryAttributes: CategoryAttribute[];
}
