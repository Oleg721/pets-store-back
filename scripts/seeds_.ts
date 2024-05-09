import fetch from 'node-fetch';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { CreateAttributeNameDto } from 'src/resources/attribute-name/dto/create-attribute-name.dto';
import { CreateCategoryDto } from 'src/resources/category/dto/create-category.dto';
import { CreateProductDto } from 'src/resources/product/dto/create-product.dto';
// const fetch = require('node-fetch');

// seeds
const usersData = [
	{
		username: 'Shinsu',
		firstname: 'Shawna',
		lastname: 'Alvarez',
		password: 'qwe123',
		email: 'qqq@gmail.com',
	},
	{
		username: 'Derick',
		firstname: 'Liam',
		lastname: 'Davis',
		password: 'qwe123',
		email: 'qqq1@gmail.com',
	},
	{
		username: 'Latoya',
		firstname: 'Louella',
		lastname: 'Black',
		password: 'qwe123',
		email: 'qqq2@gmail.com',
	},
];

const attributeNamesData = [
	{ name: 'color', type: 'string' },
	{ name: 'sex', type: 'string' },
	{ name: 'birthDate', type: 'string' },
	{ name: 'breed', type: 'string' },
	{ name: 'size', type: 'string' },
	{ name: 'weight', type: 'numeric' },
	{ name: 'brand', type: 'string' },
	{ name: 'material', type: 'string' },
	{ name: 'packSize', type: 'string' },
	{ name: 'lifestage', type: 'string' },
];
const petAttributeNames = [
	'color',
	'sex',
	'birthDate',
	'bread',
	'size',
	'lifestage',
];
const accessoriesAttributeNames = ['color', 'brand', 'material', 'lifestage'];
const foodAttributeNames = ['brand', 'weight', 'lifestage', 'packSize'];

const categoriesData = [
	{
		name: 'pet',
		description: 'Description for animal category',
		parentId: null,
		children: [
			{
				name: 'cat',
				description: 'Description for cat category',
				attributeNames: petAttributeNames,
			},
			{
				name: 'dog',
				description: 'Description for dog category',
				attributeNames: petAttributeNames,
			},
			{
				name: 'rabbit',
				description: 'Description for rabbit category',
				attributeNames: petAttributeNames,
			},
			{
				name: 'parrot',
				description: 'Description for parrot category',
				attributeNames: petAttributeNames,
			},
			{
				name: 'birds',
				description: 'Description for birds category',
				attributeNames: petAttributeNames,
			},
		],
	},
	{
		name: 'accessories',
		description: 'Description for accessories category',
		parentId: null,
		children: [
			{
				name: 'toys',
				description: 'Description for toys category',
				attributeNames: accessoriesAttributeNames,
			},
			{
				name: 'plates',
				description: 'Description for plates category',
				attributeNames: accessoriesAttributeNames,
			},
			{
				name: 'crates',
				description: 'Description for crates category',
				attributeNames: accessoriesAttributeNames,
			},
			{
				name: 'beds',
				description: 'Description for beds category',
				attributeNames: accessoriesAttributeNames,
			},
			{
				name: 'leash',
				description: 'Description for leash category',
				attributeNames: accessoriesAttributeNames,
			},
			{
				name: 'collars',
				description: 'Description for collars category',
				attributeNames: accessoriesAttributeNames,
			},
			{
				name: 'muzzle',
				description: 'Description for muzzle category',
				attributeNames: accessoriesAttributeNames,
			},
			{
				name: 'bandanas',
				description: 'Description for bandanas category',
				attributeNames: accessoriesAttributeNames,
			},
			{
				name: 'cages',
				description: 'Description for cage category',
				attributeNames: accessoriesAttributeNames,
			},
		],
	},
	{
		name: 'food',
		description: 'Description for food category',
		parentId: null,
		children: [
			{
				name: 'Dog Food',
				description: 'Description for Dog Food category',
				attributeNames: foodAttributeNames,
			},
			{
				name: 'Cat Food',
				description: 'Description for Cat Food category',
				attributeNames: foodAttributeNames,
			},
			{
				name: 'Fish Food',
				description: 'Description for Fish Food category',
				attributeNames: foodAttributeNames,
			},
			{
				name: 'Bird Food',
				description: 'Description for Bird Food category',
				attributeNames: foodAttributeNames,
			},
			{
				name: 'Reptile Food',
				description: 'Description for Reptile Food category',
				attributeNames: foodAttributeNames,
			},
			{
				name: 'Exotic Pet Food',
				description: 'Description for Exotic Pet Food category',
				attributeNames: foodAttributeNames,
			},
		],
	},
];

const getProductsData = (categoryMap) => [
	{
		name: 'fluffy',
		description: 'Description for fluffy white cat product',
		price: 10,
		categoryId: categoryMap['cat'],
		productAttributes: {
			color: 'white',
			sex: 'female',
			birthDate: '2024-01-09 22:51:00.055698',
			size: 'small',
		},
	},
	{
		name: 'red parrot',
		description: 'Description for red parrot product',
		price: 15,
		categoryId: categoryMap['birds'],
		productAttributes: {
			color: 'red',
			sex: 'male',
			birthDate: '2024-02-09 22:51:00.055698',
			size: 'small',
		},
	},
	{
		name: 'tight muzzle',
		description: 'Description for tight muzzle product',
		price: 15,
		categoryId: categoryMap['muzzle'],
		productAttributes: {
			color: 'black',
			brand: 'nike',
			material: 'polyester',
			lifestage: 'yang',
		},
	},
	// {
	// 	name: 'cage',
	// 	description: 'Description for cage product',
	// 	price: 25,
	// 	categoryId: categoryMap['cages'],
	// 	productAttributes: {
	// 		color: 'gray',
	// 		brand: 'gucci',
	// 		material: 'steel',
	// 		lifestage: 'any',
	// 	},
	// },
	{
		name: 'bear toy',
		description: 'Description for bear toy product',
		price: 30,
		categoryId: categoryMap['toys'],
		productAttributes: {
			color: 'yellow',
			brand: 'hugo',
			material: 'rubber',
			lifestage: 'any',
		},
	},
	{
		name: 'akita inu',
		description: 'Description for bear toy product',
		price: 130,
		categoryId: categoryMap['dog'],
		productAttributes: {
			color: 'braun',
			sex: 'male',
			birthDate: '2023-11-09 22:51:00.055698',
			size: 'big',
		},
	},
	{
		name: 'Doggits',
		description: 'Description for Doggits product',
		price: 0.5,
		categoryId: categoryMap['Dog Food'],
		productAttributes: {
			brand: 'dog food maker',
			weight: '0.2',
			lifestage: 'any',
			packSize: 'S',
		},
	},
	{
		name: 'chupacumpra',
		description: 'Description for chupacumpra product',
		price: 14.14,
		categoryId: categoryMap['Exotic Pet Food'],
		productAttributes: {
			brand: 'mazuri',
			weight: '11',
			lifestage: 'old',
			packSize: 'L',
		},
	},
];

const apiUrl = 'http://localhost:3000/api/v1';
const resources = {
	products: 'products',
	categories: 'categories',
	attributeNames: 'attribute-names',
	categoryAttribute: 'category-attribute',
	productAttributeNames: 'product-attribute-names',
	auth: 'auth/register',
};

const sendFetch = async (
	url,
	options: { method?: string; body?: any } = {}
) => {
	try {
		const res = await fetch(url, {
			method: options.method || 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: options.body ? JSON.stringify(options.body) : null,
		});
		return res.json();
	} catch (e) {
		return null;
	}
};

const attributeNamesMap = {};
const categoryMap = {};

const addUsersToDB = async (users: RegisterDto[]) => {
	const promises = users.map((user) =>
		sendFetch(`${apiUrl}/${resources.auth}`, {
			body: user,
			method: 'POST',
		})
	);
	const result = await Promise.all(promises);
	console.log('=======add Users result', result);
};

const addAttributeNameToDB = async (
	attributeNames: CreateAttributeNameDto[]
) => {
	const promises = attributeNames.map((an) =>
		sendFetch(`${apiUrl}/${resources.attributeNames}`, {
			body: an,
			method: 'POST',
		})
	);
	const result = await Promise.all(promises);
	console.log('=======add AttributeName result', result);
};

const saveAttributeNamesFromDB = async () => {
	const data = await sendFetch(`${apiUrl}/${resources.attributeNames}`);
	data?.content.forEach((an) => {
		attributeNamesMap[an.name] = an.id;
	});
};

const saveCategoriesFromDB = async () => {
	const data = await sendFetch(`${apiUrl}/${resources.categories}`);
	data?.content.forEach((an) => {
		categoryMap[an.name] = an.id;
	});
};

const addCategoriesToDB = async (
	categoriesTree: (CreateCategoryDto & {
		children: (Partial<CreateCategoryDto> & { attributeNames: string[] })[];
	})[]
) => {
	const promisesForRootCategories = categoriesTree.map(
		async ({ children: _, ...rootCategory }) =>
			sendFetch(`${apiUrl}/${resources.categories}`, {
				body: rootCategory,
				method: 'POST',
			})
	);
	const rootCategoryData = await Promise.all(promisesForRootCategories);
	console.log('=======add root category result', rootCategoryData);

	await saveCategoriesFromDB();

	const childrenCategories = categoriesTree.reduce((acc, rc) => {
		if (!categoryMap[rc.name]) {
			return acc;
		}

		const children = rc.children.map(({ attributeNames, ...child }) => ({
			...child,
			parentId: categoryMap[rc.name],
			attributeNameIds: attributeNames
				.map((name) => attributeNamesMap[name])
				.filter((e) => e),
		}));
		return [...acc, ...children];
	}, []);

	const childrenCategoriesResult = [];
	for (const childCategory of childrenCategories) {
		const result = await sendFetch(`${apiUrl}/${resources.categories}`, {
			body: childCategory,
			method: 'POST',
		});
		childrenCategoriesResult.push(result);
	}

	console.log('===childrenCategories', childrenCategoriesResult);
};

const addProductsToDB = async (products: CreateProductDto[]) => {
	const promises = products.map((product) =>
		sendFetch(`${apiUrl}/${resources.products}`, {
			body: product,
			method: 'POST',
		})
	);
	const result = await Promise.all(promises);
	console.log('=======add product result', result);
};

const runSeeds = async () => {
	await addUsersToDB(usersData);
	await addAttributeNameToDB(attributeNamesData);
	await saveAttributeNamesFromDB();
	await addCategoriesToDB(categoriesData);
	await saveCategoriesFromDB();
	await addProductsToDB(getProductsData(categoryMap))
};

runSeeds();
