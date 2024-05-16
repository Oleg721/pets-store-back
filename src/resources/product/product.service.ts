import { Inject, Injectable } from '@nestjs/common';

import { Product } from 'src/entities';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-test.dto';
import { CategoryService } from '../category/category.service';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { ProductAttributeNameService } from '../product-attribute-name/product-attribute-name.service';
import { CreateProductAttributeNameDto } from '../product-attribute-name/dto/create-product-attribute-name.dto';

@Injectable()
export class ProductService extends BaseCrudService<
	Product,
	UpdateProductDto,
	CreateProductDto
> {
	constructor(
		@Inject(Product)
		private productRepository: Repository<Product>,
		private readonly categoryService: CategoryService,
		private readonly categoryAttributeService: CategoryAttributeService,
		private readonly productAttributeNameService: ProductAttributeNameService
	) {
		super(productRepository);
	}

	override async create(
		createDto: CreateProductDto
	): Promise<CreateProductDto & Product> {
		const category = await this.categoryService.findOne(createDto.categoryId);

		if (!category || category.parentId === null) {
			return null;
		}

		const product = new Product();
		product.name = createDto.name;
		product.category = category;
		product.description = createDto.description;
		product.price = createDto.price;
		product.status = createDto.status || undefined;

		const createdProduct = await super.create(product);

		const hasProductAttributes =
			createDto?.productAttributes &&
			Object.entries(createDto?.productAttributes).length > 0;

		if (!hasProductAttributes) {
			return createdProduct;
		}

		const productAttributes = createDto.productAttributes;

		//TODO move check logic to productAttributeNameService create
		const [categoryAttributes] = await this.categoryAttributeService.findAll({
			where: {
				categoryId: category.id,
				attributeName: {
					name: In(Object.keys(productAttributes)),
				},
			},
			relations: {
				attributeName: true,
			},
		});

		const categoryAttributesMap = categoryAttributes.reduce(
			(acc, categoryAttribute) => {
				acc[categoryAttribute.attributeName.name] = categoryAttribute;
				return acc;
			},
			{}
		);

		for (const attributeName in productAttributes) {
			const categoryAttribute = categoryAttributesMap[attributeName];

			if (categoryAttribute) {
				const createProductAttributeNameDto =
					new CreateProductAttributeNameDto();

				createProductAttributeNameDto.categoryAttributeId =
					categoryAttribute.id;
				createProductAttributeNameDto.productId = createdProduct.id;
				createProductAttributeNameDto.value =
					productAttributes[attributeName].toString();

				await this.productAttributeNameService.create(
					createProductAttributeNameDto
				);
			}
		}

		return this.getByIdWithAttributes(createdProduct.id);
	}

	async getByIdWithAttributes(id: number): Promise<Product> {
		const test = await this.productRepository.findOne({
			where: { id },
			relations: {
				productAttributeNames: {
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
