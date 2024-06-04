import { Module } from '@nestjs/common';
import { CategoryAttributeService } from './category-attribute.service';
import { CategoryAttributeController } from './category-attribute.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryAttributeMapperProvider } from './category-attribute-mapper.provider';
import { CategoryService } from '../category/category.service';
import { ProductAttributeNameService } from '../product-attribute-name/product-attribute-name.service';
import { ProductAttrNameMapperProvider } from '../product-attribute-name/product-attribute-name-mapper.provider';
import { AttributeNameModule } from '../attribute-name/attribute-name.module';

@Module({
	imports: [DatabaseModule, AttributeNameModule],
	controllers: [CategoryAttributeController],
	providers: [
		CategoryAttributeService,
		CategoryAttributeMapperProvider,
		CategoryService,
		ProductAttributeNameService,
		ProductAttrNameMapperProvider
	],
})
export class CategoryAttributeModule {}
