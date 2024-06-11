import { ApiProperty } from '@nestjs/swagger';

export class CreateWarehouseDto {
	@ApiProperty()
	name: string;
}
