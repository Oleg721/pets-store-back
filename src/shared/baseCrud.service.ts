import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseEntity } from 'src/entities/base.entity';
import { MapperType } from 'src/types';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseCrudService<
	TEntity extends BaseEntity,
	TDto,
	TCreateDto,
> {
	constructor(
		private _repository: Repository<TEntity>,
		private mapper: MapperType<TEntity, TDto>
	) {}

	async getAll(): Promise<TDto[]> {
		const entities = await this._repository.find();
		return entities.map<TDto>((e) => this.mapper(e));
	}

	async getById(
		id: number,
		options: FindManyOptions<TEntity> = {}
	): Promise<TDto> {
		const entity = await this._repository.findOneBy({
			id,
			...options,
		} as FindOptionsWhere<TEntity>);

		if (!entity) throw new NotFoundException(`Entity with ID ${id} not found`);

		return this.mapper(entity);
	}

	async updateById(id: number, data: Partial<TEntity>): Promise<TEntity> {
		const entity = await this._repository.findOneBy({
			id,
		} as FindOptionsWhere<TEntity>);

		if (!entity) {
			throw new NotFoundException(`Entity with ID ${id} not found`);
		}

		return await this._repository.save({ ...entity, ...data });
	}

	create(dto: TCreateDto): Promise<TDto> {
		return null
	}

	async deleteById(id: number): Promise<void> {
		await this._repository.delete(id);
	}

	protected onBeforeCreate (dto: TCreateDto): void {
	}
}
