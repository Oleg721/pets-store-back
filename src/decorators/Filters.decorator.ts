import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

//TODO: add validation for existing fields
export const Filters = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest();

		let filters = null;

		if (typeof request.query.filters === 'string') {
			filters = request.query?.filters.startsWith('[')
				? JSON.parse(request.query?.filters)
				: [JSON.parse(request.query?.filters)];
		}

		if (Array.isArray(request.query.filters)) {
			filters = request.query.filters.map((f) => JSON.parse(f));
		}

		return filters || null;
	}
);
