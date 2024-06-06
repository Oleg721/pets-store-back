import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseStockDto } from './dto/create-warehouse-stock.dto';
import { UpdateWarehouseStockDto } from './dto/update-warehouse-stock.dto';
import { WarehouseStock } from 'src/entities';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class WarehouseStockService {
	constructor(
		@Inject(WarehouseStock)
		private repository: Repository<WarehouseStock>
	) {}
	create({ productId, warehouseId, quantity }: CreateWarehouseStockDto) {
		const isExist = this.repository.existsBy({ productId, warehouseId });

		if (isExist) {
			throw new Error(
				`WarehouseStock with productId: ${productId} and warehouseId: ${warehouseId} already exist`
			);
		}

		return this.repository.save({ productId, warehouseId, quantity });
	}

	findAll(
		options: FindManyOptions<WarehouseStock> = {}
	): Promise<[WarehouseStock[], number]> {
		return this.repository.findAndCount(options);
	}

	findOne(warehouseId: number, productId: number) {
		return this.repository.findOneBy({ productId, warehouseId });
	}

	async update(
		warehouseId: number,
		productId: number,
		updateWarehouseStockDto: UpdateWarehouseStockDto
	) {
		const entity = await this.repository.findOneBy({
			warehouseId,
			productId,
		} as FindOptionsWhere<WarehouseStock>);

		if (!entity) {
			throw new NotFoundException(
				`Entity with warehouseId: ${warehouseId} productId: ${productId} and  not found`
			);
		}

		return this.repository.save({ ...entity, ...updateWarehouseStockDto });
	}

	remove(warehouseId: number, productId: number) {
		return `This action removes a #${warehouseId} ,${productId} warehouseStock`;
	}
}
