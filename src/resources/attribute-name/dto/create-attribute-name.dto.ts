import { ApiProperty } from "@nestjs/swagger";
import { TypeEnum } from "src/entities/attributeName.entity";

export class CreateAttributeNameDto {
	@ApiProperty()
	name: string;
	@ApiProperty()
	type: TypeEnum;
}
