import { Injectable } from '@nestjs/common';



import { PaginationResult } from '../../common/dto/pagination.dto';
import { WarehouseViewDto } from './dto/view-warehouse.dto';
import { Warehouse } from 'src/entities';

@Injectable()
export class WarehouseMapperProvider {
	entityToViewPaginationDto(
		[data, count]: [data: Warehouse[], count: number],
		hasPagination: boolean = true
	): PaginationResult<WarehouseViewDto> {
		const dtoArr = data.map((attribute) => {
			return this.entityToViewDto(attribute);
		});

		const viewResultDto = new PaginationResult<WarehouseViewDto>(
			dtoArr,
			hasPagination ? count : undefined
		);

		return viewResultDto;
	}

	entityToViewDto(attributeName: Warehouse): WarehouseViewDto {
		const viewDto = new WarehouseViewDto();

		viewDto.id = attributeName.id;
		viewDto.name = attributeName.name;


		return viewDto;
	}
}
