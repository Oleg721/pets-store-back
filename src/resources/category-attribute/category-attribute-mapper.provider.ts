import { Injectable } from '@nestjs/common';
import { CategoryAttribute } from 'src/entities';
import { CategoryNameViewDto } from './dto/view-category-attribute.dto';

@Injectable()
export class CategoryAttributeMapperProvider {
	entityToViewDto(categoryAttribute: CategoryAttribute): CategoryNameViewDto {
		const attributeNameViewDto = new CategoryNameViewDto();

		attributeNameViewDto.id = categoryAttribute.id;

		return attributeNameViewDto;
	}
}
