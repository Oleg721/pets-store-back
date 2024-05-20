import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

//TODO: add validation for existing fields
export const SortBy = createParamDecorator(
	(_: unknown, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest();

		let sortBy = null;

		if (typeof request.query.sort_by === 'string') {
			sortBy = request.query?.sort_by.startsWith('[')
				? JSON.parse(request.query?.sort_by)
				: [JSON.parse(request.query?.sort_by)];
		}

		if (Array.isArray(request.query.sort_by)) {
			sortBy = request.query.sort_by.map((s) => JSON.parse(s));
		}

		return sortBy || null;
	}
);
