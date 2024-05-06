import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination, PaginationDecorator } from 'src/decorators/Pagination.decorator';
import { ProductService } from './product.service';
import { ProductViewDto } from './dto/productView.dto';
import { ProductMapperProvider } from './productMapper.provider';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
	constructor(
		private readonly productService: ProductService,
		private readonly mapper: ProductMapperProvider
	) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
	  return this.productService.create(createProductDto);
	}

	@Get()
	async getAll(
		@PaginationDecorator() options: Pagination
	): Promise<ProductViewDto[]> {
		const result = await this.productService.findAll(options);
		return result.map<ProductViewDto>((prod) =>
			this.mapper.productToViewDto(prod)
		);
	}

	@Get(':id')
	async getById(@Param('id') id: number): Promise<ProductViewDto | null> {
		const product = await this.productService.getByIdWithAttributes(id);
		if (product == null) {
			throw new NotFoundException('Product not found');
		}
		return this.mapper.productToViewDto(product);
	}
  
	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
	//   return this.productService.update(+id, updateTestDto);
	// }
  
	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.productService.remove(+id);
	// }
}
