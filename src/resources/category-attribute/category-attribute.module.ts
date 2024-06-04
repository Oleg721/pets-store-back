import { Module, forwardRef } from '@nestjs/common';
import { CategoryAttributeService } from './category-attribute.service';
import { CategoryAttributeController } from './category-attribute.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryAttributeMapperProvider } from './category-attribute-mapper.provider';
import { AttributeNameModule } from '../attribute-name/attribute-name.module';
import { ProductAttributeNameModule } from '../product-attribute-name/product-attribute-name.module';
import { CategoryModule } from '../category/category.module';

@Module({
	imports: [
		DatabaseModule,
		AttributeNameModule,
		ProductAttributeNameModule,
		forwardRef(() => CategoryModule),
	],
	controllers: [CategoryAttributeController],
	providers: [CategoryAttributeService, CategoryAttributeMapperProvider],
	exports: [CategoryAttributeService],
})
export class CategoryAttributeModule {}
