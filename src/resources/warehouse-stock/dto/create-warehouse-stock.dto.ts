import { ApiProperty } from "@nestjs/swagger";

export class CreateWarehouseStockDto {
    @ApiProperty()
	productId: number;
    @ApiProperty()
	warehouseId: number;
    @ApiProperty({
        minimum: 1,
        
    })
    quantity: number;
}
