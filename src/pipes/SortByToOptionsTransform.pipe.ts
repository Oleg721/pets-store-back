import { PipeTransform, Injectable } from '@nestjs/common';
import { createNestedObjectByIdPath } from './utils';

@Injectable()
export class SortByToOptionsTransform implements PipeTransform {
	transform(value: any) {
		return value ? createNestedObjectByIdPath(value, getSortByValue) : {};
	}
}

const getSortByValue = (data) => {
	return data.desc ? 'desc' : 'asc'
};