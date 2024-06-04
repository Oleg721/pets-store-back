import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductMapperProvider } from './productMapper.provider';
import { CategoryService } from '../category/category.service';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { ProductAttributeNameService } from '../product-attribute-name/product-attribute-name.service';
import { ProductAttrNameMapperProvider } from '../product-attribute-name/product-attribute-name-mapper.provider';
import { AttributeNameModule } from '../attribute-name/attribute-name.module';

@Module({
	imports: [DatabaseModule, AttributeNameModule],
	providers: [
		ProductService,
		ProductMapperProvider,
		CategoryService,
		CategoryAttributeService,
		ProductAttributeNameService,
		ProductAttrNameMapperProvider
	],
	controllers: [ProductController],
})
export class ProductModule {}
