import { ApiQueryOptions } from '@nestjs/swagger';

export const filtersApiQuerySchema: ApiQueryOptions = {
	name: 'filters',
	required: false,
	schema: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					description:
						"The ID of the field in the response object, if you need to filter by nested objects, the ID must be a path through a dot - 'category.name'",
					example: 'status',
				},
				type: {
					type: 'string',
					description: 'model column name',
					enum: ['includesValue', 'dateBetween', 'byNumeric'],
				},
				value: {
					oneOf: [
						{
							type: 'array',
							description: 'value for includesValue',
							items: {
								type: 'string',
								example: 'available',
							},
						},
						{
							type: 'object',
							description: 'value for dateBetween',
							properties: {
								from: {
									type: 'string',
									format: 'date',
								},
								to: {
									type: 'string',
									format: 'date',
								},
							},
						},
						{
							type: 'object',
							description: 'value for byNumeric',
							properties: {
								values: {
									type: 'array',
									items: {
										type: 'number',
									},
									maxItems: 2,
									minItems: 1,
								},
								comparison: {
									type: 'string',
									enum: [
										'equalTo',
										'notEqualTo',
										'moreThan',
										'lessThen',
										'between',
										'notBetween',
									],
								},
							},
						},
					],
				},
			},
		},
	},
};

export const sortByApiQuerySchema: ApiQueryOptions = {
	name: 'sort_by',
	required: false,
	schema: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					description:
						"The ID of the field in the response object, if you need to filter by nested objects, the ID must be a path through a dot - 'category.name'",
					example: 'price',
				},
				desc: {
					type: 'boolean',
					example: true,
				},
			},
		},
	},
};
