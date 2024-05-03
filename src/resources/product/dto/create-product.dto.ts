import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from 'src/entities/product.entity';

export class CreateProductDto {
    @ApiProperty()
	name: string;

    @ApiProperty()
	description: string;

    @ApiProperty()
	status: ProductStatus;

    @ApiProperty()
	price: number;
    
    @ApiProperty()
	categoryId: number;
}
