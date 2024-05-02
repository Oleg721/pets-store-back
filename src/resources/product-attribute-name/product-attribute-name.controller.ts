import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductAttributeNameService } from './product-attribute-name.service';
import { CreateProductAttributeNameDto } from './dto/create-product-attribute-name.dto';
import { UpdateProductAttributeNameDto } from './dto/update-product-attribute-name.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product-attribute-names')
@ApiTags('product-attribute-names')
export class ProductAttributeNameController {
  constructor(private readonly productAttributeNameService: ProductAttributeNameService) {}

  @Post()
  create(@Body() createProductAttributeNameDto: CreateProductAttributeNameDto) {
    return this.productAttributeNameService.create(createProductAttributeNameDto);
  }

  @Get()
  findAll() {
    return this.productAttributeNameService.findAll();
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
