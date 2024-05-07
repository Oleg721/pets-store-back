import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	BadRequestException,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { AttributeNameService } from './attribute-name.service';
import { CreateAttributeNameDto } from './dto/create-attribute-name.dto';
import { UpdateAttributeNameDto } from './dto/update-attribute-name.dto';
import { AttributeNameMapperProvider } from './attribute-name-mapper.provider';
import { AttributeNameViewDto } from './dto/view-attribute-name.dto';
import {
	Pagination,
	PaginationDecorator,
} from 'src/decorators/Pagination.decorator';
import { AttributeName } from 'src/entities';
import { PaginationResult } from '../pagination/dto/pagination.dto';

@ApiTags('attribute-names')
@Controller('attribute-names')
export class AttributeNameController {
	constructor(
		private readonly attributeNameService: AttributeNameService,
		private readonly mapper: AttributeNameMapperProvider
	) {}

	@Post()
	async create(@Body() createAttributeNameDto: CreateAttributeNameDto) {
		//TODO: create exception filter or use different approach
		try {
			return await this.attributeNameService.create(createAttributeNameDto);
		} catch (err) {
			if (err?.message?.startsWith('AttributeName with name')) {
				throw new BadRequestException(err.message);
			} else {
				throw err;
			}
		}
	}

	@Get()
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
	async findAll(
		@PaginationDecorator() pagination: Pagination
	): Promise<PaginationResult<AttributeNameViewDto>> {
		const [data, count] = await this.attributeNameService.findAll({
			...pagination,
		});

		const total = pagination ? count : undefined;

		return this.mapper.entityToViewPaginationDto([data, total] as [
			AttributeName[],
			number,
		]);
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<AttributeNameViewDto> {
		return this.mapper.entityToViewDto(
			await this.attributeNameService.findOne(+id)
		);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateAttributeNameDto: UpdateAttributeNameDto
	) {
		return this.attributeNameService.update(+id, updateAttributeNameDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.attributeNameService.remove(+id);
	}
}
