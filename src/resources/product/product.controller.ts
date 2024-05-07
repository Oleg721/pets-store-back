import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { Pagination, PaginationDecorator } from 'src/decorators/Pagination.decorator';
import { ProductService } from './product.service';
import { ProductViewDto } from './dto/productView.dto';
import { ProductMapperProvider } from './productMapper.provider';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationResult } from '../pagination/dto/pagination.dto';
import { Product } from 'src/entities';

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
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'limit', required: false })
	async getAll(
		@PaginationDecorator() pagination: Pagination
	): Promise<PaginationResult<ProductViewDto>> {
		const [data, count] = await this.productService.findAll({ ...pagination});

		const total = pagination ? count: undefined;
		return this.mapper.productToViewPaginationDto([data, total] as [Product[], number]);
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
