import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductMapperProvider } from './categoryMapper.provider';

@Controller('category')
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly mapper: ProductMapperProvider
	) {}

	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoryService.create(createCategoryDto);
	}

	@Get()
	async findAll(@Query('category-attributes') hasCategoryAttributes?: string) {
		const categories =
			hasCategoryAttributes === 'true'
				? await this.categoryService.findAllWithCategoryAttributes()
				: await this.categoryService.findAll();

		return categories.map((c) => this.mapper.EntityToViewDto(c));
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
