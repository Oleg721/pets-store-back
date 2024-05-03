import { Module } from '@nestjs/common';
import { CategoryAttributeService } from './category-attribute.service';
import { CategoryAttributeController } from './category-attribute.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryAttributeMapperProvider } from './category-attribute-mapper.provider';
import { CategoryService } from '../category/category.service';
import { AttributeNameService } from '../attribute-name/attribute-name.service';

@Module({
	imports: [DatabaseModule],
	controllers: [CategoryAttributeController],
	providers: [
		CategoryAttributeService,
		CategoryAttributeMapperProvider,
		CategoryService,
		AttributeNameService,
	],
})
export class CategoryAttributeModule {}
