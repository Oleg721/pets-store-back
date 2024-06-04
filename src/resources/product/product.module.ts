import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductMapperProvider } from './productMapper.provider';
import { CategoryService } from '../category/category.service';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { AttributeNameModule } from '../attribute-name/attribute-name.module';
import { ProductAttributeNameModule } from '../product-attribute-name/product-attribute-name.module';

@Module({
	imports: [DatabaseModule, AttributeNameModule, ProductAttributeNameModule],
	providers: [
		ProductService,
		ProductMapperProvider,
		CategoryService,
		CategoryAttributeService,
	],
	controllers: [ProductController],
	exports: [ProductService, ProductMapperProvider],
})
export class ProductModule {}
