import { Injectable } from '@nestjs/common';
import {
	AttributeName,
	CategoryAttribute,
	Product,
	ProductAttributeName,
} from 'src/entities';
import { CategoryNameViewDto } from './dto/view-category-attribute.dto';

@Injectable()
export class CategoryAttributeMapperProvider {
	entityToViewDto(categoryAttribute: CategoryAttribute): CategoryNameViewDto {
		const attributeNameViewDto = new CategoryNameViewDto();

		attributeNameViewDto.id = categoryAttribute.id;

		return attributeNameViewDto;
	}
}
