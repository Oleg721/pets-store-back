import { Module } from '@nestjs/common';
import { CategoryAttributeService } from './category-attribute.service';
import { CategoryAttributeController } from './category-attribute.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryAttributeMapperProvider } from './category-attribute-mapper.provider';
import { CategoryService } from '../category/category.service';
import { AttributeNameModule } from '../attribute-name/attribute-name.module';
import { ProductAttributeNameModule } from '../product-attribute-name/product-attribute-name.module';

@Module({
	imports: [DatabaseModule, AttributeNameModule, ProductAttributeNameModule],
	controllers: [CategoryAttributeController],
	providers: [
		CategoryAttributeService,
		CategoryAttributeMapperProvider,
		CategoryService,
	],
})
export class CategoryAttributeModule {}
