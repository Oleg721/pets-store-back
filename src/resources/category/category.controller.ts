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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductMapperProvider } from './categoryMapper.provider';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/entities';
import {
	Pagination,
	PaginationDecorator,
} from 'src/decorators/Pagination.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly mapper: ProductMapperProvider
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
