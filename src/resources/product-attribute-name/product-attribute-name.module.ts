import { Module } from '@nestjs/common';
import { ProductAttributeNameService } from './product-attribute-name.service';
import { ProductAttributeNameController } from './product-attribute-name.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductAttrNameMapperProvider } from './product-attribute-name-mapper.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductAttributeNameController],
  providers: [ProductAttributeNameService, ProductAttrNameMapperProvider],
})
export class ProductAttributeNameModule {}
