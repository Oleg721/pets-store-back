import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductMapperProvider } from './productMapper.provider';
import { CategoryService } from '../category/category.service';
import { AttributeNameService } from '../attribute-name/attribute-name.service';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { ProductAttributeNameService } from '../product-attribute-name/product-attribute-name.service';
import { ProductAttrNameMapperProvider } from '../product-attribute-name/product-attribute-name-mapper.provider';

@Module({
	imports: [DatabaseModule],
	providers: [
		ProductService,
		ProductMapperProvider,
		CategoryService,
		AttributeNameService,
		CategoryAttributeService,
		ProductAttributeNameService,
		ProductAttrNameMapperProvider
	],
	controllers: [ProductController],
})
export class ProductModule {}
