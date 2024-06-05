import { Injectable } from '@nestjs/common';

import { PaginationResult } from '../../common/dto/pagination.dto';
import { WarehouseStock } from 'src/entities';
import { WarehouseStockViewDto } from './dto/view-warehouse-stock.dto';


@Injectable()
export class WarehouseStockMapperProvider {
	entityToViewPaginationDto(
		[data, count]: [data: WarehouseStock[], count: number],
		hasPagination: boolean = true
	): PaginationResult<WarehouseStockViewDto> {
		const dtoArr = data.map((attribute) => {
			return this.entityToViewDto(attribute);
		});

		const viewResultDto = new PaginationResult<WarehouseStockViewDto>(
			dtoArr,
			hasPagination ? count : undefined
		);

		return viewResultDto;
	}

	entityToViewDto(attributeName: WarehouseStock): WarehouseStockViewDto {
		const viewDto = new WarehouseStockViewDto();

		viewDto.productId = attributeName.productId;
		viewDto.warehouseId = attributeName.warehouseId;
		viewDto.quantity = attributeName.quantity;

		return viewDto;
	}
}
