import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Between, Equal, In, LessThan, MoreThan, Not } from 'typeorm';
import { createNestedObjectByIdPath } from './utils';

//TODO: add validation for existing fields
export const Filters = createParamDecorator(
	(_: unknown, ctx: ExecutionContext) => {
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

		return filters ? createNestedObjectByIdPath(filters, getFilter) : {};
	}
);

const getComparisonMap = (left: number, right?: number) => ({
	equalTo: Equal(left),
	notEqualTo: Not(left),
	moreThan: MoreThan(left),
	lessThen: LessThan(left),
	between: Between(left, right),
	notBetween: Not(Between(left, right)),
});

const getFilter = (testData) => {
	const { type, value } = testData;
	switch (type) {
		case 'includesValue': {
			return In(value);
		}
		case 'byNumeric': {
			const [left, right] = value.values;

			const isValidValue =
				value.values.length === 1
					? !isNaN(+left)
					: !isNaN(+left) && !isNaN(+right);

			if (!isValidValue) {
				return null;
			}

			const comparisonMap = getComparisonMap(left, right);

			return comparisonMap[value.comparison] || null;
		}
	}
};
