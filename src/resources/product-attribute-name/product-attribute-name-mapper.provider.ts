import { Injectable } from '@nestjs/common';

import { ProductAttributeName } from 'src/entities';
import { ViewProductAttributeNameDto } from './dto/view-product-attribute-name.dto';
import { PaginationResult } from '../../common/dto/pagination.dto';
import { ProductAttributeValuesViewDto } from './dto/view-product-attribute-values.dto';
import { TypeEnum } from 'src/entities/attributeName.entity';
import { MaxAndMinRawResultType, StringRawResultType } from './types';

@Injectable()
export class ProductAttrNameMapperProvider {
	productAttrNameToViewPaginationDto(
		[attrNames, count]: [attrNames: ProductAttributeName[], count: number],
		hasPagination: boolean = true
	): PaginationResult<ViewProductAttributeNameDto> {
		const usersDto = attrNames.map((an) => this.productAttrNamesToViewDto(an));
		const userViewResultDto = new PaginationResult<ViewProductAttributeNameDto>(
			usersDto,
			hasPagination ? count : undefined
		);

		return userViewResultDto;
	}

	productAttrNamesToViewDto(
		productAttrName: ProductAttributeName
	): ViewProductAttributeNameDto {
		const productAttributeNameViewDto = new ViewProductAttributeNameDto();

		productAttributeNameViewDto.id = productAttrName.id;
		productAttributeNameViewDto.value = productAttrName.value;
		productAttributeNameViewDto.productId = productAttrName.productId;
		productAttributeNameViewDto.categoryAttributeId =
			productAttrName.categoryAttributeId;

		return productAttributeNameViewDto;
	}

	stringTypeAttributesRawToObject(
		data: StringRawResultType[]
	): ProductAttributeValuesViewDto[] {
		const attributeMap: Record<string, string[]> = data.reduce(
			(acc, attributeRaw) => {
				acc[attributeRaw.name] = acc[attributeRaw.name]
					? [...acc[attributeRaw.name], attributeRaw.value]
					: [attributeRaw.value];
				return acc;
			},
			{}
		);

		return Object.entries(attributeMap).map(([name, values]) => ({
			name,
			type: TypeEnum.STRING,
			values,
		}));
	}

	numericOrDateTypeAttributesRawToObject(
		data: MaxAndMinRawResultType[],
		type: TypeEnum.DATE | TypeEnum.NUMBER
	): ProductAttributeValuesViewDto[] {
		return data.map(({name, min_value, max_value}) => ({
			name,
			type: type,
			values: [min_value, max_value]
		}));
	}
}
