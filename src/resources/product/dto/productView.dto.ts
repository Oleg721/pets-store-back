import { ProductStatus } from 'src/entities/product.entity';

export class ProductViewDto {
	id: number;

	name: string;

	description: string;

	status: ProductStatus;

	price: number;

	createdat: Date;

	categoryId: number;

	productAttributes?: { [key: string]: string | number | Date };
}
