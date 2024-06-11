import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WarehouseStockService } from './warehouse-stock.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { WarehouseStockMapperProvider } from './warehouse-stock-mapper.provider';
import {
	PaginationDecorator,
	Pagination,
} from 'src/decorators/Pagination.decorator';

@ApiTags('warehouse-stock')
@Controller('warehouse-stock')
export class WarehouseStockController {
	constructor(
		private readonly warehouseStockService: WarehouseStockService,
		private readonly mapper: WarehouseStockMapperProvider
	) {}

	@Get()
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
	async findAll(@PaginationDecorator() pagination: Pagination) {
		const result = await this.warehouseStockService.findAll({ ...pagination });
		return this.mapper.entityToViewPaginationDto(result);
	}

	@Get(':warehouseId')
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
	async findAllByWarehouse(
		@PaginationDecorator() pagination: Pagination,
		@Param('warehouseId', ParseIntPipe) warehouseId: number
	) {
		const result = await this.warehouseStockService.findAll({
			...pagination,
			where: {
				warehouseId,
			},
		});
		return this.mapper.entityToViewPaginationDto(result);
	}

	@Get(':warehouseId/:productId')
	async findOne(
		@Param('warehouseId', ParseIntPipe) warehouseId: number,
		@Param('productId', ParseIntPipe) productId: number
	) {
		const result = await this.warehouseStockService.findOne(
			warehouseId,
			productId
		);
		return this.mapper.entityToViewDto(result);
	}
}
