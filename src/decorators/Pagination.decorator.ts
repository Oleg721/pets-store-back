import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IsInt, IsOptional, Min, validateSync } from 'class-validator';
import { Request } from 'express';

export interface Pagination {
	take?: number;
	skip?: number;
}

class PaginationParams {
	@IsInt()
	@Min(1)
	take: number;

	@IsInt()
	@Min(0)
	@IsOptional()
	skip: number;
}

export const PaginationDecorator = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest();

		const page = request.query.page;
		const size = request.query.size;

		const paginationParams = new PaginationParams();

		paginationParams.take = size ? parseInt(size as string) : undefined;
		paginationParams.skip = page ? parseInt(page as string) : undefined;

		const validationErrors = validateSync(paginationParams);

		if (validationErrors?.length) {
			return undefined;
		}

		return {
			take: paginationParams.take,
			skip: paginationParams.skip,
		};
	}
);
