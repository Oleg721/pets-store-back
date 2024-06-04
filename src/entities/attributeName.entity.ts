import { Entity, Column, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { BaseEntity } from './base.entity';
import { CategoryAttribute } from './categoryAttribute.entity';

export enum TypeEnum {
	STRING = 'string',
	NUMBER = 'numeric',
	DATE = 'date',
}


@Entity('AttributeNames')
export class AttributeName extends BaseEntity {
	@Column({
		unique: true,
	})
	@IsNotEmpty()
	name: string;

	@Column({
		type: 'enum',
		enum: TypeEnum,
		enumName: 'attributes_type_enum'
	})
	@IsNotEmpty()
	type: TypeEnum;

	@OneToMany(
		() => CategoryAttribute,
		(categoryAttribute) => categoryAttribute.attributeName
	)
	categoryAttributes: CategoryAttribute[];
}
