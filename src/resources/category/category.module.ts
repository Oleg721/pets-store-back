import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryMapperProvider } from './categoryMapper.provider';
import { AttributeNameModule } from '../attribute-name/attribute-name.module';
import { ProductAttributeNameModule } from '../product-attribute-name/product-attribute-name.module';
import { ProductModule } from '../product/product.module';
import { CategoryAttributeModule } from '../category-attribute/category-attribute.module';

@Module({
	imports: [
		DatabaseModule,
		AttributeNameModule,
		ProductAttributeNameModule,
		ProductModule,
		CategoryAttributeModule,
	],
	controllers: [CategoryController],
	providers: [CategoryService, CategoryMapperProvider],
	exports: [CategoryService],
})
export class CategoryModule {}
