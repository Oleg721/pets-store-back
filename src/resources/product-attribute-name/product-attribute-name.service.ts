import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateProductAttributeNameDto } from './dto/create-product-attribute-name.dto';
import { UpdateProductAttributeNameDto } from './dto/update-product-attribute-name.dto';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { ProductAttributeName } from 'src/entities';

@Injectable()
export class ProductAttributeNameService extends BaseCrudService<
	ProductAttributeName,
	UpdateProductAttributeNameDto,
	CreateProductAttributeNameDto
> {
	constructor(
		@Inject(ProductAttributeName)
		private productAttributeNameRepository: Repository<ProductAttributeName>
	) {
		super(productAttributeNameRepository);
	}
}
