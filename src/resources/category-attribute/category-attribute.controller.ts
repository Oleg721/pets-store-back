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
import { CategoryAttributeService } from './category-attribute.service';
import { CreateCategoryAttributeDto } from './dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from './dto/update-category-attribute.dto';
import { ApiTags } from '@nestjs/swagger';

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

	@Get()
	async findAll(@Query('with-relations') hasRelations?: boolean) {
		return (hasRelations.toString() === "true" )
			? this.categoryAttributeService.findAllWithCategoryAndAttrName()
			: this.categoryAttributeService.findAll();
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
