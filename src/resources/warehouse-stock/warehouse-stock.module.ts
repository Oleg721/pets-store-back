import { Module } from '@nestjs/common';
import { WarehouseStockService } from './warehouse-stock.service';
import { WarehouseStockController } from './warehouse-stock.controller';
import { DatabaseModule } from 'src/database/database.module';
import { WarehouseStockMapperProvider } from './warehouse-stock-mapper.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [WarehouseStockController],
  providers: [WarehouseStockService, WarehouseStockMapperProvider],
})
export class WarehouseStockModule {}
