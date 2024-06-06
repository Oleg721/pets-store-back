import { Inject, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { Warehouse } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService extends BaseCrudService<
	Warehouse,
	UpdateWarehouseDto,
	CreateWarehouseDto
> {
	constructor(
		@Inject(Warehouse)
		private repository: Repository<Warehouse>
	) {
		super(repository);
	}
}
