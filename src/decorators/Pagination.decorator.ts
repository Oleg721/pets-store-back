import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'; 

export interface Pagination {
	take?: number;
	skip?: number;
}

export const PaginationDecorator = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest();

		const page = request.query.page;
		const size = request.query.size;

		const pageNum = Number(page);
		const limitNum = Number(size);

		const take = limitNum || undefined;
		const skip = (pageNum - 1) * limitNum || undefined;

		return {
			take,
			skip,
		};
	}
);
