import { Injectable } from '@nestjs/common';

import { Product, ProductAttributeName } from 'src/entities';
import { ProductViewDto } from './dto/productView.dto';
import { PaginationResult } from '../pagination/dto/pagination.dto';

const convertAttributesArrayToObject = (
	arr: ProductAttributeName[]
): Record<string, string | number | Date> =>
	arr.reduce((acc, e) => {
		const attrName = e?.categoryAttribute?.attributeName?.name;
		if (attrName) {
			const value = e?.value || null;
			acc[attrName] = value;
		}
		return acc;
	}, {});

@Injectable()
export class ProductMapperProvider {
	productToViewPaginationDto([products, count]: [
		product: Product[],
		count: number,
	]): PaginationResult<ProductViewDto> {
		const productsDto = products.map((product) => {
			return this.productToViewDto(product);
		});
		const productViewResultDto = new PaginationResult<ProductViewDto>(
			productsDto,
			count
		);

		return productViewResultDto;
	}
	productToViewDto(product: Product): ProductViewDto {
		const productViewDto = new ProductViewDto();

		productViewDto.id = product.id;
		productViewDto.categoryId = product.categoryId;
		productViewDto.createdat = product.createdat;
		productViewDto.description = product.description;
		productViewDto.name = product.name;
		productViewDto.price = product.price;
		productViewDto.status = product.status;
		if (
			product.productAttributeName &&
			Array.isArray(product.productAttributeName)
		) {
			productViewDto.productAttributes = convertAttributesArrayToObject(
				product.productAttributeName
			);
		}

		return productViewDto;
	}
}
