import { PartialType } from '@nestjs/swagger';
import { CreateWarehouseStockDto } from './create-warehouse-stock.dto';

export class UpdateWarehouseStockDto extends PartialType(CreateWarehouseStockDto) {}
