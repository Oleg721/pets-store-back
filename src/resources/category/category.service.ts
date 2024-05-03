import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseCrudService } from 'src/shared/services/baseCrud.service';
import { Category } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseCrudService<Category, UpdateCategoryDto, CreateCategoryDto> {
	constructor(
		@Inject(Category)
		private categoryRepository: Repository<Category>
	) {
		super(categoryRepository);
	}

	async findAllWithCategoryAttributes(): Promise<Category[]> {
		return this.categoryRepository.find({
			relations: {
				categoryAttributes: {
					attributeName: true,
				}
			}
		});
	}
}
