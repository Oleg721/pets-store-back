import {
	Inject,
	Injectable,
} from '@nestjs/common';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { Repository } from 'typeorm';
import { AttributeName } from 'src/entities';

import { CreateAttributeNameDto } from './dto/create-attribute-name.dto';
import { UpdateAttributeNameDto } from './dto/update-attribute-name.dto';

@Injectable()
export class AttributeNameService extends BaseCrudService<
	AttributeName,
	UpdateAttributeNameDto,
	CreateAttributeNameDto
> {
	constructor(
		@Inject(AttributeName)
		private attributeNameRepository: Repository<AttributeName>
	) {
		super(attributeNameRepository);
	}

	findOneByName(name: string): Promise<AttributeName> {
		return this.attributeNameRepository.findOneBy({
			name,
		});
	}

	override async create(
		createAttributeNameDto: CreateAttributeNameDto
	): Promise<AttributeName> {
		const existingAN = await this.findOneByName(createAttributeNameDto.name);
		if (existingAN)
			throw Error(
				`AttributeName with name ${createAttributeNameDto.name} already exist`
			);
		return super.create(createAttributeNameDto);
	}
}
