import { Injectable } from '@nestjs/common';
import { AttributeName, Product, ProductAttributeName } from 'src/entities';
import { AttributeNameViewDto } from './dto/view-attribute-name.dto';


@Injectable()
export class AttributeNameMapperProvider {
	entityToViewDto(attributeName: AttributeName): AttributeNameViewDto {
		const attributeNameViewDto = new AttributeNameViewDto()

		attributeNameViewDto.id = attributeName.id;
		attributeNameViewDto.name = attributeName.name;
		attributeNameViewDto.type = attributeName.type;

		return attributeNameViewDto;
	}
}
