import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product, User } from 'src/entities';
import { ProductService } from './product.service';
import { MapperType } from 'src/types';
import { ProductViewDto } from './dto/productView.dto';

const transform: MapperType<Product, ProductViewDto> = (product) => {
	const productViewDto = new ProductViewDto()
	productViewDto.name = product.name
	productViewDto.createdat = product.createdat
	productViewDto.description = product.description
	productViewDto.price = product.price
	productViewDto.categoryId = product.categoryId

	productViewDto.productAttributes = product?.productAttributeName?.reduce((acc, e) => {
		const attrName = e?.categoryAttribute?.attributeName?.name
		if(attrName) {
			const value = e?.value || null
			acc[attrName] = value
		}
		return acc;
	}, {}) || null

	return productViewDto
};

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getAll(): Promise<ProductViewDto[]> {
		console.log('controller getAllProd');
		const result = await this.productService.getAll()
		return result.map<ProductViewDto>(prod => transform(prod));
	}

	@Get(':id')
	async getById(
		@Param('id') id: number,

	): Promise<ProductViewDto | null> {

		return transform(await this.productService.getByIdWithAttributes(id));
	}
}
