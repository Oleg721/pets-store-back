import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCategoryAttributeDto } from './dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from './dto/update-category-attribute.dto';
import { BaseCrudService } from 'src/shared/services/baseCrud.service';
import { CategoryAttribute } from 'src/entities';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { AttributeNameService } from '../attribute-name/attribute-name.service';

@Injectable()
export class CategoryAttributeService extends BaseCrudService<
	CategoryAttribute,
	UpdateCategoryAttributeDto,
	CreateCategoryAttributeDto
> {
	constructor(
		@Inject(CategoryAttribute)
		private categoryAttribute: Repository<CategoryAttribute>,
		@Inject(forwardRef(() => CategoryService))
		private readonly categoryService: CategoryService,
		private readonly attributeNameService: AttributeNameService
	) {
		super(categoryAttribute);
	}
	override async create(
		createDto: CreateCategoryAttributeDto
	): Promise<CreateCategoryAttributeDto & CategoryAttribute> {
		const isCorrect = await this.checkCreateDto(createDto);

		return isCorrect ? super.create(createDto) : null;
	}

	async createMany(
		createDto: CreateCategoryAttributeDto[]
	): Promise<CreateCategoryAttributeDto[] & CategoryAttribute[]> {
		const correctDto = createDto.filter((cd) => this.checkCreateDto(cd));

		return correctDto.length !== 0
			? this.categoryAttribute.save(correctDto)
			: null;
	}

	private async checkCreateDto(createDto: CreateCategoryAttributeDto) {
		const isExist = await this.categoryAttribute.existsBy(createDto);
		if (isExist) {
			throw new Error(
				`CategoryAttribute with categoryId: ${createDto.categoryId} and attributeNameId: ${createDto.attributeNameId} already exist`
			);
		}

		const isCategoryExist = await this.categoryService.isExistById(
			createDto.categoryId
		);
		if (!isCategoryExist) {
			throw new Error(`Category with Id: ${createDto.categoryId} not exist`);
		}

		const isAttributeNameExist = await this.attributeNameService.isExistById(
			createDto.attributeNameId
		);
		if (!isAttributeNameExist) {
			throw new Error(
				`AttributeName with Id: ${createDto.attributeNameId} not exist`
			);
		}
		return true;
	}
}
