import { Injectable } from '@nestjs/common';

import { ProductAttributeName } from 'src/entities';
import { ViewProductAttributeNameDto } from './dto/view-product-attribute-name.dto';
import { PaginationResult } from '../../common/dto/pagination.dto';

@Injectable()
export class ProductAttrNameMapperProvider {
	productAttrNameToViewPaginationDto([attrNames, count]: [
		attrNames: ProductAttributeName[],
		count: number,
	]): PaginationResult<ViewProductAttributeNameDto> {
		const usersDto = attrNames.map((an) =>this.productAttrNamesToViewDto(an));
		const userViewResultDto = new PaginationResult<ViewProductAttributeNameDto>(
			usersDto,
			count
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
		productAttributeNameViewDto.categoryAttributeId = productAttrName.categoryAttributeId;

		return productAttributeNameViewDto;
	}
}
