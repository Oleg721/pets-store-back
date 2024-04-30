import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/entities';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll(): Promise<Category[]> {
		console.log('controller getAllProd');
		return this.categoryService.getAll();
	}

	@Get(':id')
	async getById(
		@Param('id') id: number,
	): Promise<Category | null> {

		return await this.categoryService.getById(id);
	}
}
