import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryMapperProvider } from './categoryMapper.provider';
import { AttributeNameService } from '../attribute-name/attribute-name.service';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { ProductService } from '../product/product.service';
import { ProductAttributeNameService } from '../product-attribute-name/product-attribute-name.service';
import { ProductMapperProvider } from '../product/productMapper.provider';
import { ProductAttrNameMapperProvider } from '../product-attribute-name/product-attribute-name-mapper.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [CategoryController],
	providers: [
		CategoryService,
		CategoryMapperProvider,
		ProductMapperProvider,
		AttributeNameService,
		CategoryAttributeService,
		ProductService,
		ProductAttributeNameService,
		ProductAttrNameMapperProvider
	]
})
export class CategoryModule {}
