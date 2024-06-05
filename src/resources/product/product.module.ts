import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductMapperProvider } from './productMapper.provider';
import { ProductAttributeNameModule } from '../product-attribute-name/product-attribute-name.module';
import { CategoryAttributeModule } from '../category-attribute/category-attribute.module';
import { CategoryModule } from '../category/category.module';

@Module({
	imports: [
		DatabaseModule,
		ProductAttributeNameModule,
		CategoryAttributeModule,
		forwardRef(() => CategoryModule),
	],
	providers: [ProductService, ProductMapperProvider],
	controllers: [ProductController],
	exports: [ProductService, ProductMapperProvider],
})
export class ProductModule {}
