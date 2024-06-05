export function createNestedObjectByIdPath(
	dataArr: { id: 'string'; [key: string]: any }[],
	valueMapCallBack?: (data: { [key: string]: any }) => any
): Record<string, any> {
	const obj = {};

	dataArr.forEach((data) => {
		const { id, ...restFields } = data;
		const pathArr = id.split('.');
		const value = valueMapCallBack ? valueMapCallBack(restFields) : restFields;

		let temp = obj;

		pathArr.forEach((key, index) => {
			if (index === pathArr.length - 1) {
				temp[key] = temp[key] ? { ...value, ...temp[key] } : value;
			} else {
				temp[key] = temp[key] ? { ...temp[key] } : {};
				temp = temp[key];
			}
		});
	});

	return obj;
}

export function isValidDate(dateString: string): boolean {
	if (!dateString) {
		return false;
	}

	const date = new Date(dateString);
	const timestamp = date.getTime();

	if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
		return false;
	}

	if (date.toISOString() !== dateString) {
		return false;
	}

	return true;
}
