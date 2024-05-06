import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'; 

export interface Pagination {
	take?: number;
	skip?: number;
}

const defaultItemsLimit = 20;

export const PaginationDecorator = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest();

		const page = request.query.page || 1;
		const limit = request.query.limit || defaultItemsLimit;

		const pageNum = Number(page);
		const limitNum = Number(limit);

		const take = limitNum > 0 ? limitNum : defaultItemsLimit;
		const skip = (pageNum - 1) * limitNum;

		return {
			take,
			skip,
		};
	}
);
