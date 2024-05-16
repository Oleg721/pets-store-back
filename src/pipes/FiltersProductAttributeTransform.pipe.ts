import { PipeTransform, Injectable } from '@nestjs/common';
import { Raw } from 'typeorm';
import { isValidDate } from './utils';

@Injectable()
export class FiltersProductAttributeTransformPipe implements PipeTransform {
	transform(value: any[]) {
		const { restFilters, attributeFilters } = value.reduce(
			(acc, filter) => {
				if (filter?.id?.split('.').includes('productAttributeNames')) {
					acc['attributeFilters'].push(filter);
				} else {
					acc['restFilters'].push(filter);
				}
				return acc;
			},
			{ restFilters: [], attributeFilters: [] }
		);

		if (!attributeFilters.length) {
			return restFilters;
		}

		const fullIdPath = attributeFilters[0].id;
		const idPath = fullIdPath.replace(/\.[^.]+$/, '');

		const filterRawQueries = attributeFilters
			.map((f) => getRawQueryByAttribute(f))
			.filter((e) => e);

		if (!filterRawQueries.length) {
			return restFilters;
		}

		return [
			...restFilters,
			{
				id: idPath,
				type: 'custom',
				value: { productId: Raw(getQueryRawTemplate(filterRawQueries)) },
			},
		];
	}
}

const getRawQueryByAttribute = (filter) => {
	const attributeName = filter.id.match(
		/\.?productAttributeNames.([a-zA-Z]+)$/
	)?.[1];

	if (!attributeName) {
		return null;
	}
	switch (filter.type) {
		case 'includesValue': {
			const valuesString = filter.value.map((f) => `'${f}'`).join();
			return valuesString
				? `(select cbp.value from CategoryByProductId cbp WHERE cbp.name='${attributeName}') IN (${valuesString})`
				: null;
		}
		case 'byNumeric': {
			const {
				values: [left, right],
				values,
				comparison,
			} = filter.value;

			const isValidValue =
				values.length === 1 ? !isNaN(+left) : !isNaN(+left) && !isNaN(+right);

			if (!isValidValue) {
				return null;
			}

			const comparisonMap = getComparisonMap(left, right);
			const comparisonRaw = comparisonMap[comparison];

			if (!comparison) {
				return null;
			}

			return `(select cbp.value from CategoryByProductId cbp where cbp.name='${attributeName}' AND cbp.type='numeric')::numeric ${comparisonRaw}`;
		}

		case 'dateBetween': {
			const { from, to } = filter.value;

			const isValidValue =
				!from || !to || (isValidDate(from) && isValidDate(to));

			if (!isValidValue) {
				return null;
			}

			return `(select cbp.value from CategoryByProductId cbp where cbp.name='${attributeName}'
						AND cbp.type='date')::date BETWEEN '${from}' AND '${to}'`;
		}
	}
	return null;
};

const getQueryRawTemplate =
	(rawWhereQueries: string[]) => (productId: string) => {
		const formattedProductId = productId
			.split('.')
			.map((e) => `"${e}"`)
			.join('.');
		return `EXISTS (
    WITH CategoryByProductId AS (
    SELECT pan.value, an.name, an.type FROM "ProductAttributeNames" pan
        LEFT JOIN "CategoryAttributes" ca ON ca."id" = pan."categoryAttributeId"
        LEFT JOIN "AttributeNames" an ON an."id" = ca."attributeNameId"
        WHERE pan."productId" = ${formattedProductId}
    )

    SELECT *
    FROM CategoryByProductId
    WHERE ${rawWhereQueries.join(' AND ')} )`;
	};

const getComparisonMap = (left: number, right?: number) => ({
	equalTo: `=${left}`,
	notEqualTo: `<>${left}`,
	moreThan: `>${left}`,
	lessThen: `<${left}`,
	between: `BETWEEN ${left} AND ${right}`,
	notBetween: `NOT BETWEEN ${left} AND ${right}`,
});
