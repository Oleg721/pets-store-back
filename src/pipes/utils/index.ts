export function createNestedObjectByIdPath(
	dataArr: { id: 'string'; [key: string]: any }[],
	valueMapCallBack?: (data: { [key: string]: any }) => any
): Record<string, any> {
	let obj = {};

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
	const regex = /^\d{4}-\d{2}-\d{2}$/;

	if (!dateString.match(regex)) {
		return false;
	}

	const date = new Date(dateString);
	const timestamp = date.getTime();

	if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
		return false;
	}

	return true;
}
