import { Inject, Injectable } from '@nestjs/common';

import { Product } from 'src/entities';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-test.dto';

@Injectable()
export class ProductService extends BaseCrudService<Product, UpdateProductDto, CreateProductDto> {
	constructor(
		@Inject(Product)
		private productRepository: Repository<Product>
	) {
		super(productRepository);
	}

	async getByIdWithAttributes(id: number): Promise<Product> {
		const test = await this.productRepository.findOne({
			where: { id },
			relations: {
				productAttributeName: {
					categoryAttribute: {
						attributeName: true,
					},
				},
				category: true,
			},
		});

		const result = test;

		return result;
	}
}
