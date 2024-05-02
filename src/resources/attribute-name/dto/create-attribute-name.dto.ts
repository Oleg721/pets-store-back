import { ApiProperty } from "@nestjs/swagger";

export class CreateAttributeNameDto {
	@ApiProperty()
	name: string;
	@ApiProperty()
	type: string;
}
