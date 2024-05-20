import { Injectable } from '@nestjs/common';

import { Category, CategoryAttribute } from 'src/entities';
import { CreateViewDto } from './dto/view-category.dto';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { CategoryAttributeValuesViewDto } from './dto/view-category-attribute-values.dto';
import { ProductMapperProvider } from '../product/productMapper.provider';

const transformCategoryAttributes = (
	categoryAttributes: CategoryAttribute[]
): { name: string; type: string }[] => {
	return categoryAttributes?.map((ca) => {
		const { id: _, ...rest } = ca.attributeName;
		return { ...rest };
	});
};

@Injectable()
export class CategoryMapperProvider {
	EntityToPaginationViewDto(
		[categories, count]: [categories: Category[], count: number],
		hasPagination: boolean = true
	): PaginationResult<CreateViewDto> {
		const categoriesDto = categories.map((c) => this.EntityToViewDto(c));

		return new PaginationResult<CreateViewDto>(
			categoriesDto,
			hasPagination ? count : undefined
		);
	}

	constructor(private readonly productMapperProvider: ProductMapperProvider){

	}

	EntityToViewDto(category: Category): CreateViewDto {
		const categoryViewDto = new CreateViewDto();
		(categoryViewDto.id = category.id),
			(categoryViewDto.description = category.description);
		categoryViewDto.name = category.name;
		categoryViewDto.parentId = category.parentId;
		categoryViewDto.parent =
			category.parent && this.EntityToViewDto(category.parent);
		categoryViewDto.children = category?.children?.map((c) =>
			this.EntityToViewDto(c)
		);
		categoryViewDto.categoryAttributes =
			category.categoryAttributes &&
			transformCategoryAttributes(category.categoryAttributes);

		if( category.products){
			categoryViewDto.products = category.products.map(this.productMapperProvider.productToViewDto);
		}

		return categoryViewDto;
	}

	categoryAttributesViewDto([catAttributes]: [
		catAttributes: CategoryAttribute[],
	]): CategoryAttributeValuesViewDto[] {
		const categoryViewDtos = catAttributes.map(cat => {
			const categoryViewDto = new CategoryAttributeValuesViewDto();
			
			const valuesSet = new Set<string | number>();
			cat.productAttributeNames?.forEach(attr => valuesSet.add(attr.value));
			
			categoryViewDto.name = cat.attributeName.name;
			categoryViewDto.type = cat.attributeName.type;
			categoryViewDto.values = Array.from(valuesSet);

			return categoryViewDto;
	});
		return categoryViewDtos;
	}
}
