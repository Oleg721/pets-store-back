import { IsEmail, IsString, MinLength } from 'class-validator';
import { ProductStatus } from 'src/entities/product.entity';

export class ProductViewDto {
    name: string

    description: string

    status: ProductStatus

    price: string

    createdat: Date;

    categoryId: number

    productAttributes: {[key: string]: string}
}
