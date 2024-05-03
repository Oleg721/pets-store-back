import { PartialType } from '@nestjs/swagger';

import { CreateProductAttributeNameDto } from './create-product-attribute-name.dto';

export class UpdateProductAttributeNameDto extends PartialType(CreateProductAttributeNameDto) {}
