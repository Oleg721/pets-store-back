import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateProductAttributeNameDto } from './dto/create-product-attribute-name.dto';
import { UpdateProductAttributeNameDto } from './dto/update-product-attribute-name.dto';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { ProductAttributeName } from 'src/entities';
import { ProductAttrNameMapperProvider } from './product-attribute-name-mapper.provider';
import { TypeEnum } from 'src/entities/attributeName.entity';
import { MaxAndMinRawResultType, StringRawResultType } from './types';
import { ProductAttributeValuesViewDto } from './dto/view-product-attribute-values.dto';


@Injectable()
export class ProductAttributeNameService extends BaseCrudService<
	ProductAttributeName,
	UpdateProductAttributeNameDto,
	CreateProductAttributeNameDto
> {
	constructor(
		@Inject(ProductAttributeName)
		private productAttributeNameRepository: Repository<ProductAttributeName>,
		private readonly mapper: ProductAttrNameMapperProvider
	) {
		super(productAttributeNameRepository);
	}

	async getAggregatedProductAttributesByCategory(categoryId: number): Promise<ProductAttributeValuesViewDto[]> {
		const stringTypeAttributesRaw = this.productAttributeNameRepository
			.createQueryBuilder('pan')
			.select(['DISTINCT(pan.value) as value', 'an.name as name'])
			.leftJoin('pan.categoryAttribute', 'ca')
			.leftJoin('ca.attributeName', 'an')
			.where('ca.categoryId = :categoryId AND an.type = :type', {
				categoryId,
				type: 'string',
			})
			.getRawMany()
			.then((data: StringRawResultType[]) => ({ data, type: TypeEnum.STRING }));

		const numericTypeAttributesRaw = this.getAttributeMinAndMaxValueByType(
			categoryId,
			TypeEnum.NUMBER
		).then((data: MaxAndMinRawResultType[]) => ({
			data,
			type: TypeEnum.NUMBER,
		}));

		const dateTypeAttributesRaw = this.getAttributeMinAndMaxValueByType(
			categoryId,
			TypeEnum.DATE
		).then((data: MaxAndMinRawResultType[]) => ({ data, type: TypeEnum.DATE }));

		const results = await Promise.allSettled([
			numericTypeAttributesRaw,
			dateTypeAttributesRaw,
			stringTypeAttributesRaw,
		]);

		return results.reduce((acc, result) => {
			if (result.status === 'rejected') {
				return acc;
			}
			switch (result.value.type) {
				case TypeEnum.STRING: {
					const stringTypeAttributes =
						this.mapper.stringTypeAttributesRawToObject(
							result.value.data as StringRawResultType[]
						);
					return [...acc, ...stringTypeAttributes];
				}
				case TypeEnum.NUMBER:
				case TypeEnum.DATE: {
					const attributes = this.mapper.numericOrDateTypeAttributesRawToObject(
						result.value.data as MaxAndMinRawResultType[],
						result.value.type
					);
					return [...acc, ...attributes];
				}
				default:
					return acc;
			}
		}, []);
	}

	private getAttributeMinAndMaxValueByType(
		categoryId: number,
		attrType: TypeEnum.NUMBER | TypeEnum.DATE
	): Promise<MaxAndMinRawResultType[]> {
		return this.productAttributeNameRepository
			.createQueryBuilder('pan')
			.select([
				'an.name as name',
				`MIN(pan.value::${attrType}) as min_value`,
				`MAX(pan.value::${attrType}) as max_value`,
			])
			.leftJoin('pan.categoryAttribute', 'ca')
			.leftJoin('ca.attributeName', 'an')
			.where('ca.categoryId = :categoryId AND an.type = :type', {
				categoryId,
				type: attrType,
			})
			.groupBy('an.name')
			.getRawMany();
	}
}
