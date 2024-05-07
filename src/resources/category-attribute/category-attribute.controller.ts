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
import { CategoryAttributeService } from './category-attribute.service';
import { CreateCategoryAttributeDto } from './dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from './dto/update-category-attribute.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
	Pagination,
	PaginationDecorator,
} from 'src/decorators/Pagination.decorator';

@ApiTags('category-attribute')
@Controller('category-attribute')
export class CategoryAttributeController {
	constructor(
		private readonly categoryAttributeService: CategoryAttributeService
	) {}

	@Post()
	create(@Body() createCategoryAttributeDto: CreateCategoryAttributeDto) {
		return this.categoryAttributeService.create(createCategoryAttributeDto);
	}

	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
	@ApiQuery({ name: 'with_category', required: false })
	@ApiQuery({ name: 'with_attribute_name', required: false })
	@Get()
	async findAll(
		@PaginationDecorator() pagination: Pagination,
		@Query('with_category', new ParseBoolPipe({ optional: true }))
		hasCategoryRelations?: boolean,
		@Query('with_attribute_name', new ParseBoolPipe({ optional: true }))
		hasAttributeName?: boolean
	) {
		const relations = {
			category: hasCategoryRelations,
			attributeName: hasAttributeName,
		};
		return this.categoryAttributeService.findAll({ relations, ...pagination });
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoryAttributeService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCategoryAttributeDto: UpdateCategoryAttributeDto
	) {
		return this.categoryAttributeService.update(
			+id,
			updateCategoryAttributeDto
		);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoryAttributeService.remove(+id);
	}
}
