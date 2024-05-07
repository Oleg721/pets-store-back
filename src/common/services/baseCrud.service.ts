import { NotFoundException } from '@nestjs/common';

import { BaseEntity } from 'src/entities/base.entity';
import {
	DeepPartial,
	FindManyOptions,
	FindOptionsWhere,
	Repository,
} from 'typeorm';

export abstract class BaseCrudService<
	TEntity extends BaseEntity,
	TUpdateDto,
	TCreateDto extends DeepPartial<TEntity>,
> {
	constructor(private _repository: Repository<TEntity>) {}

	async create(createDto: TCreateDto) {
		return this._repository.save(createDto);
	}

	async findAll(
		options: FindManyOptions<TEntity> = {}
	): Promise<[TEntity[], number] | TEntity[]> {
		return this._repository.findAndCount(options);
	}

	async findOne(id: number): Promise<TEntity> {
		const entity = await this._repository.findOneBy({
			id,
		} as FindOptionsWhere<TEntity>);

		if (!entity) throw new NotFoundException(`Entity with ID ${id} not found`);

		return entity;
	}

	async update(id: number, updateDto: TUpdateDto): Promise<TEntity> {
		const entity = await this._repository.findOneBy({
			id,
		} as FindOptionsWhere<TEntity>);

		if (!entity) {
			throw new NotFoundException(`Entity with ID ${id} not found`);
		}

		return this._repository.save({ ...entity, ...updateDto });
	}

	// TODO: add boolean result///
	async remove(id: number): Promise<void> {
		await this._repository.delete(id);
	}

	isExistById(id: number): Promise<boolean> {
		return this._repository.existsBy({ id } as FindOptionsWhere<TEntity>);
	}
}
