import { PartialType } from '@nestjs/swagger';
import { CreateAttributeNameDto } from './create-attribute-name.dto';
import { TypeEnum } from 'src/entities/attributeName.entity';

export class UpdateAttributeNameDto extends PartialType(CreateAttributeNameDto) {
    
	name: string;
    
	type: TypeEnum;
}
