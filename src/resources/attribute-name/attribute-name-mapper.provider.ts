import { Injectable } from '@nestjs/common';

import { AttributeName } from 'src/entities';
import { AttributeNameViewDto } from './dto/view-attribute-name.dto';
import { PaginationResult } from '../../common/dto/pagination.dto';

@Injectable()
export class AttributeNameMapperProvider {
	entityToViewPaginationDto(
		[attributes, count]: [attribute: AttributeName[], count: number],
		hasPagination: boolean = true
	): PaginationResult<AttributeNameViewDto> {
		const attributeDto = attributes.map((attribute) => {
			return this.entityToViewDto(attribute);
		});

		const productViewResultDto = new PaginationResult<AttributeNameViewDto>(
			attributeDto,
			hasPagination ? count : undefined
		);

		return productViewResultDto;
	}

	entityToViewDto(attributeName: AttributeName): AttributeNameViewDto {
		const attributeNameViewDto = new AttributeNameViewDto();

		attributeNameViewDto.id = attributeName.id;
		attributeNameViewDto.name = attributeName.name;
		attributeNameViewDto.type = attributeName.type;

		return attributeNameViewDto;
	}
}
