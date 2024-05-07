export class PaginationResult<TEntity> {
	content: TEntity[];
	count?: number;

	constructor(items: TEntity[] = [], totalItems?: number) {
		this.content = items;
		this.count = totalItems;
	}
}
