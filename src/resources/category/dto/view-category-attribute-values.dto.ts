import { TypeEnum } from 'src/entities/attributeName.entity';

export class CategoryAttributeValuesViewDto {
	name: string;
	type: TypeEnum;
	values?: (string | number)[]; // each value is unique
}
