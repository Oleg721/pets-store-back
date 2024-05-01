import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductMapperProvider } from './productMapper.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService, ProductMapperProvider],
  controllers: [ProductController]
})
export class ProductModule {}
