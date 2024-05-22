import { TypeEnum } from "src/entities/attributeName.entity";

export class AttributeNameViewDto {
	id: number;

	name: string;
    
	type: TypeEnum;
}