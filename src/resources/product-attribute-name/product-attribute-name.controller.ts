import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { ProductAttributeNameService } from './product-attribute-name.service';
import { CreateProductAttributeNameDto } from './dto/create-product-attribute-name.dto';
import { UpdateProductAttributeNameDto } from './dto/update-product-attribute-name.dto';
import { ProductAttrNameMapperProvider } from './product-attribute-name-mapper.provider';
import { Pagination, PaginationDecorator } from 'src/decorators/Pagination.decorator';
import { ProductAttributeName } from 'src/entities';

@Controller('product-attribute-names')
@ApiTags('product-attribute-names')
export class ProductAttributeNameController {
  constructor(
    private readonly productAttributeNameService: ProductAttributeNameService,
		private readonly mapper: ProductAttrNameMapperProvider
  ) {}

  @Post()
  create(@Body() createProductAttributeNameDto: CreateProductAttributeNameDto) {
    return this.productAttributeNameService.create(createProductAttributeNameDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
  async findAll(@PaginationDecorator() pagination: Pagination) {
    const [data, count] = await this.productAttributeNameService.findAll({ ...pagination});

		const total = pagination ? count: undefined;
    return this.mapper.productAttrNameToViewPaginationDto([data, total] as [
			ProductAttributeName[],
			number,
		]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productAttributeNameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductAttributeNameDto: UpdateProductAttributeNameDto) {
    return this.productAttributeNameService.update(+id, updateProductAttributeNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productAttributeNameService.remove(+id);
  }
}
