import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/entities';
import { BaseCrudService } from 'src/shared/baseCrud.service';
import { MapperType } from 'src/types';
import { FindManyOptions, Repository } from 'typeorm';

const mapper: MapperType<Product, Product> = (e) => e;

@Injectable()
export class ProductService extends BaseCrudService<Product, Product, Product> {
	constructor(
		@Inject(Product)
		private productRepository: Repository<Product>
	) {
		super(productRepository, mapper);
	}

	async getByIdWithAttributes(id: number): Promise<any> {
		const test = await this.productRepository.find({
			where: {id},
			relations: {
				productAttributeName: {
					categoryAttribute: {
						attributeName: true
					}
				},
				category: true,
			},
			// loadEagerRelations: true,
		})

		const result = test[0]

		return result
	}

	// create(dto: Product): Promise<Product> {
	// 	throw new Error('Method not implemented.');
	// }
}
