import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { DatabaseModule } from 'src/database/database.module';
import { WarehouseMapperProvider } from './warehouse-mapper.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [WarehouseController],
	providers: [WarehouseService, WarehouseMapperProvider],
})
export class WarehouseModule {}
