import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryMapperProvider } from './categoryMapper.provider';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { AttributeNameModule } from '../attribute-name/attribute-name.module';
import { ProductAttributeNameModule } from '../product-attribute-name/product-attribute-name.module';
import { ProductModule } from '../product/product.module';

@Module({
	imports: [DatabaseModule, AttributeNameModule, ProductAttributeNameModule, ProductModule],
	controllers: [CategoryController],
	providers: [
		CategoryService,
		CategoryMapperProvider,
		CategoryAttributeService,
	],
})
export class CategoryModule {}
