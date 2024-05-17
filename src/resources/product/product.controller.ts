import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseBoolPipe,
	Post,
	Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import {
	Pagination,
	PaginationDecorator,
} from 'src/decorators/Pagination.decorator';
import { ProductService } from './product.service';
import { ProductViewDto } from './dto/productView.dto';
import { ProductMapperProvider } from './productMapper.provider';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationResult } from '../../common/dto/pagination.dto';
import { Product } from 'src/entities';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { Filters } from 'src/decorators/Filters.decorator';
import {
	filtersApiQuerySchema,
	sortByApiQuerySchema,
} from 'src/common/swagger/filters.schema';
import { FiltersToOrmOptionsTransformPipe } from 'src/pipes/FiltersToOrmOptionsTransform.pipe';
import { FiltersProductAttributeTransformPipe } from 'src/pipes/FiltersProductAttributeTransform.pipe';
import { SortBy } from 'src/decorators/Sort.decorator';
import { SortByToOptionsTransform } from 'src/pipes/SortByToOptionsTransform.pipe';

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
	@ApiQuery({ name: 'size', required: false })
	@ApiQuery({ name: 'with-category', required: false })
	@ApiQuery({ name: 'with-attributes', required: false })
	@ApiQuery(filtersApiQuerySchema)
	@ApiQuery(sortByApiQuerySchema)
	async getAll(
		@PaginationDecorator() pagination: Pagination,
		@Filters(
			FiltersProductAttributeTransformPipe,
			FiltersToOrmOptionsTransformPipe
		)
		filters: FindOptionsWhere<Product>,
		@SortBy(SortByToOptionsTransform)
		sortBy: FindOptionsOrder<Product>,
		@Query('with-category', new ParseBoolPipe({ optional: true }))
		withCategory: boolean,
		@Query('with-attributes', new ParseBoolPipe({ optional: true }))
		withAttributes: boolean
	): Promise<PaginationResult<ProductViewDto>> {
		const products = await this.productService.findAll({
			...pagination,
			relations: {
				productAttributeNames: withAttributes && {
					categoryAttribute: {
						attributeName: true,
					},
				},
				category: withCategory,
			},
			where: {
				...filters,
			},
			order: {
				...sortBy,
			},
		});

		return this.mapper.productToViewPaginationDto(products, !!pagination);
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
