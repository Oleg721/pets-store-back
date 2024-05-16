import { PipeTransform, Injectable } from '@nestjs/common';
import { Between, Equal, In, LessThan, MoreThan, Not } from 'typeorm';
import { createNestedObjectByIdPath } from './utils';

@Injectable()
export class FiltersToOrmOptionsTransformPipe implements PipeTransform {
	transform(value: any) {
		return value ? createNestedObjectByIdPath(value, getFilter) : {};
	}
}

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
		case 'custom':
			return value;
	}
};

const getComparisonMap = (left: number, right?: number) => ({
	equalTo: Equal(left),
	notEqualTo: Not(left),
	moreThan: MoreThan(left),
	lessThen: LessThan(left),
	between: Between(left, right),
	notBetween: Not(Between(left, right)),
});
