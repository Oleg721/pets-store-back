import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	ParseBoolPipe,
	ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryMapperProvider } from './categoryMapper.provider';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Category, Product } from 'src/entities';
import {
	Pagination,
	PaginationDecorator,
} from 'src/decorators/Pagination.decorator';
import { ProductService } from '../product/product.service';
import { ProductMapperProvider } from '../product/productMapper.provider';
import {
	filtersApiQuerySchema,
	sortByApiQuerySchema,
} from 'src/common/swagger/filters.schema';
import { Filters } from 'src/decorators/Filters.decorator';
import { FiltersProductAttributeTransformPipe } from 'src/pipes/FiltersProductAttributeTransform.pipe';
import { FiltersToOrmOptionsTransformPipe } from 'src/pipes/FiltersToOrmOptionsTransform.pipe';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { SortBy } from 'src/decorators/Sort.decorator';
import { SortByToOptionsTransform } from 'src/pipes/SortByToOptionsTransform.pipe';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly productService: ProductService,
		private readonly mapper: CategoryMapperProvider,
		private readonly productMapper: ProductMapperProvider
	) {}

	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.mapper.EntityToViewDto(
			await this.categoryService.create(createCategoryDto)
		);
	}

	@Get()
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
	@ApiQuery({ name: 'with_category_attributes', required: false })
	async findAll(
		@PaginationDecorator() pagination: Pagination,
		@Query('with_category_attributes', new ParseBoolPipe({ optional: true }))
		hasCategoryAttributes?: boolean
	) {
		const relations = {
			categoryAttributes: hasCategoryAttributes && {
				attributeName: true,
			},
		};

		const categories = await this.categoryService.findAll({
			relations,
			...pagination,
		});
		return this.mapper.EntityToPaginationViewDto(
			categories as [Category[], number],
			!!pagination
		);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const category = await this.categoryService.findOne(+id);
		return this.mapper.EntityToViewDto(category);
	}

	@Get(':id/products')
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
	@ApiQuery({ name: 'with-category', required: false })
	@ApiQuery({ name: 'with-attributes', required: false })
	@ApiQuery(filtersApiQuerySchema)
	@ApiQuery(sortByApiQuerySchema)
	async getProductsByCategoryId(
		@Query('with-category', new ParseBoolPipe({ optional: true }))
		withCategory: boolean,
		@Query('with-attributes', new ParseBoolPipe({ optional: true }))
		withAttributes: boolean,
		@PaginationDecorator() pagination: Pagination,
		@Param('id', ParseIntPipe) id: number,
		@Filters(
			FiltersProductAttributeTransformPipe,
			FiltersToOrmOptionsTransformPipe
		)
		filters: FindOptionsWhere<Product>,
		@SortBy(SortByToOptionsTransform)
		sortBy: FindOptionsOrder<Product>
	) {
		const products = await this.productService.findAll({
			where: {
				...filters,
				categoryId: id,
			},
			relations: {
				productAttributeNames: withAttributes && {
					categoryAttribute: {
						attributeName: true,
					},
				},
				category: withCategory,
			},
			...pagination,
			order: {
				...sortBy,
			},
		});
		return this.productMapper.productToViewPaginationDto(
			products,
			!!pagination
		);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		return this.categoryService.update(+id, updateCategoryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoryService.remove(+id);
	}
}
