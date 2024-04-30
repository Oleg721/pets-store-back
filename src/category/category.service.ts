import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/entities';
import { BaseCrudService } from 'src/shared/baseCrud.service';
import { MapperType } from 'src/types';
import { Repository } from 'typeorm';

const mapper: MapperType<Category, Category> = (e) => e;

@Injectable()
export class CategoryService extends BaseCrudService<Category, Category, Category> {
    constructor(
		@Inject(Category)
		private categoryRepository: Repository<Category>
    ){
        super(categoryRepository, mapper);
    }
}
