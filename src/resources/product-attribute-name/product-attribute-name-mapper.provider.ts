import { Injectable } from '@nestjs/common';

import { ProductAttributeName } from 'src/entities';
import { ViewProductAttributeNameDto } from './dto/view-product-attribute-name.dto';

@Injectable()
export class ProductAttributeNameMapperProvider {
	EntityToViewDto(
		productAttributeName: ProductAttributeName
	): ViewProductAttributeNameDto {
		const productAttributeNameViewDto = new ViewProductAttributeNameDto();
		productAttributeNameViewDto.value = productAttributeName.value;
		return productAttributeNameViewDto;
	}
}
