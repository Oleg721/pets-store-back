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
import { Category } from 'src/entities';
import {
	Pagination,
	PaginationDecorator,
} from 'src/decorators/Pagination.decorator';
import { ProductService } from '../product/product.service';
import { ProductMapperProvider } from '../product/productMapper.provider';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly productService: ProductService,
		private readonly mapper: CategoryMapperProvider,
		private readonly productMapper: ProductMapperProvider,
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
		@Query('with_category_attributes', new ParseBoolPipe({optional: true}))
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
	async getProductsByCategoryId(
		@Query('with-category', new ParseBoolPipe({ optional: true }))
    withCategory: boolean,
    @Query('with-attributes', new ParseBoolPipe({ optional: true }))
    withAttributes: boolean,
		@PaginationDecorator() pagination: Pagination,
		@Param('id', ParseIntPipe) id: number
	) {
		const products = await this.productService.findAll({

			where: {
				categoryId: id,
			},
			relations: {
				productAttributeName: withAttributes && {
					categoryAttribute: {
						attributeName: true,
					},
				},
				category: withCategory,
			},
			...pagination,
		});
		return this.productMapper.productToViewPaginationDto(
			products,
			!!pagination
		);
	}

	@Get(':id/attributes')
	async getCategoryAttributes(@Param('id', ParseIntPipe) id: number) {
		const categoryAttributes =
			await this.categoryService.getAttributesWithValuesByCategory(id);
		return this.mapper.categoryAttributesViewDto(categoryAttributes);
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
