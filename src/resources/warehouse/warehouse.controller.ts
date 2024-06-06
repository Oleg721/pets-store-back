import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiTags } from '@nestjs/swagger';
import { WarehouseMapperProvider } from './warehouse-mapper.provider';


@ApiTags('warehouses')
@Controller('warehouse')
export class WarehouseController {
	constructor(
		private readonly warehouseService: WarehouseService,
		private readonly mapper: WarehouseMapperProvider
	) {}

	@Post()
	async create(@Body() createWarehouseDto: CreateWarehouseDto) {
		const result = await this.warehouseService.create(createWarehouseDto);
		return this.mapper.entityToViewDto(result);
	}

	@Get()
	async findAll() {
		const result = await this.warehouseService.findAll();
		return this.mapper.entityToViewPaginationDto(result);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const result = await this.warehouseService.findOne(+id);
    return this.mapper.entityToViewDto(result);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateWarehouseDto: UpdateWarehouseDto
	) {
		const result = await this.warehouseService.update(+id, updateWarehouseDto);
		return this.mapper.entityToViewDto(result);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.warehouseService.remove(+id);
	}
}
