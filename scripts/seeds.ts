import { loadEnvVariables } from './init.env';
// entities
import { AttributeName } from 'src/entities/attributeName.entity';
import { Category } from 'src/entities/category.entity';
import { CategoryAttribute } from 'src/entities/categoryAttribute.entity';
import { Product } from 'src/entities/product.entity';
import { ProductAttributeName } from 'src/entities/productAttributeName.entity';
import { AppDataSource } from './datasource';

// seeds
const attributeNamesData = [
  { name: 'sex', type: 'string' },
  { name: 'birthDate', type: 'string' },
  { name: 'color', type: 'string' },
  { name: 'weight', type: 'integer' },
  { name: 'speed', type: 'integer' },
  { name: 'breed', type: 'string' },
  { name: 'price', type: 'integer' },
  { name: 'age', type: 'integer' },
  { name: 'material', type: 'string' },
];
const categoriesData = [
  { name: 'animal', description: 'Description for animal category' },
  { name: 'accessories', description: 'Description for accessories category' },
  { name: 'cat', description: 'Description for cat category', parentName: 'animal' },
  { name: 'dog', description: 'Description for dog category', parentName: 'animal' },
  { name: 'muzzle', description: 'Description for muzzle category', parentName: 'accessories' },
  { name: 'hamster', description: 'Description for hamster category', parentName: 'animal' },
  { name: 'parrot', description: 'Description for parrot category', parentName: 'animal' },
  { name: 'squirrel', description: 'Description for squirrel category', parentName: 'animal' },
];
const productsData = [
  { name: 'fluffy white cat', description: 'Description for fluffy white cat product', price: 10, category: 'cat' },
  { name: 'red parrot', description: 'Description for red parrot product', price: 15, category: 'animal' },
  { name: 'tight muzzle', description: 'Description for tight muzzle product', price: 15, category: 'accessories' },
  { name: 'lick map', description: 'Description for lick map product', price: 20, category: 'accessories' },
  { name: 'cage', description: 'Description for cage product', price: 25, category: 'accessories' },
  { name: 'little hamster', description: 'Description for little hamster product', price: 5, category: 'animal' },
  { name: 'bear toy', description: 'Description for bear toy product', price: 30, category: 'accessories' },
  { name: 'akita inu', description: 'Description for bear toy product', price: 130, category: 'dog' },
];
const categoryAttributeData = [
  { category: 'animal', attributeName: 'sex' },
  { category: 'animal', attributeName: 'birthDate' },
  { category: 'animal', attributeName: 'speed' },
  { category: 'cat', attributeName: 'breed' },
  { category: 'dog', attributeName: 'breed' },
  { category: 'animal', attributeName: 'price' },
  { category: 'animal', attributeName: 'color' },
  { category: 'animal', attributeName: 'weight' },
  { category: 'accessories', attributeName: 'color' },
  { category: 'accessories', attributeName: 'price' },
];
const productAttributeNameData = [
  { value: '50', product: 'red parrot', categoryAttribute: 'weight' },
  { value: '500', product: 'red parrot', categoryAttribute: 'price' },
  { value: 'red', product: 'red parrot', categoryAttribute: 'color' },
  { value: '60', product: 'akita inu', categoryAttribute: 'weight' },
  { value: 'malamute', product: 'akita inu', categoryAttribute: 'color' },
  { value: '1', product: 'little hamster', categoryAttribute: 'weight' }, // ?
  { value: 'white', product: 'fluffy white cat', categoryAttribute: 'color' },
];


async function seedTableData() {
	try {
		
		const dataSource = await AppDataSource.initialize();
		console.log('=== Data Source has been initialized! ===');

		const attributeNamesRepo = dataSource.getRepository(AttributeName);
		const categoriesRepo = dataSource.getRepository(Category);
		const productsRepo = dataSource.getRepository(Product);
		const categoryAttributeRepo = dataSource.getRepository(CategoryAttribute);
		const productAttributeNameRepo =
			dataSource.getRepository(ProductAttributeName);

						// STEP 1: set AttributeNames data
		for (const data of attributeNamesData) {
			const existingAttributeName = await attributeNamesRepo.createQueryBuilder('ar')
				.where('ar.name =:name', { name: data.name })
				.getOne();
			if (!existingAttributeName) {
				const newAttributeName = attributeNamesRepo.create(data);
				await attributeNamesRepo.save(newAttributeName);
			}
		}

		// STEP 2: set Categories data
		const categoriesMap: { [name: string]: any } = {};

		for (const data of categoriesData) {
			let existingCategory = await categoriesRepo.createQueryBuilder('c')
				.where('c.name = :name', { name: data.name })
				.getOne();

			if (!existingCategory) {
				existingCategory = categoriesRepo.create({
					name: data.name,
					description: data.description,
				});
			} else {
				existingCategory.description = data.description;
			}
			await categoriesRepo.save(existingCategory);
			categoriesMap[data.name] = existingCategory;
		}

		// Add parent-child relationships based on parent names
		for (const data of categoriesData) {
			const category = categoriesMap[data.name];

			if (data.parentName) {
				const parentCategory = categoriesMap[data.parentName];

				if (parentCategory) {
					category.parent = parentCategory;
					await categoriesRepo.save(category);
				}
			}
		}

		// STEP 3: set Products data
		const productsMap: { [name: string]: any } = {};

		for (const data of productsData) {
			let existingProduct = await productsRepo.createQueryBuilder('p')
				.where('p.name = :name', { name: data.name })
				.getOne();

			if (!existingProduct) {
				existingProduct = productsRepo.create({
					name: data.name,
					description: data.description,
					price: data.price,
				});
			} else {
				existingProduct.description = data.description;
			}
			await productsRepo.save(existingProduct);
			productsMap[data.name] = existingProduct;
		}

		// Add category relationships based on category names
		for (const data of productsData) {
			const product = productsMap[data.name];

			if (data.category) {
				let existingCategory = await categoriesRepo.createQueryBuilder('c')
					.where('c.name = :name', { name: data.category })
					.getOne();

				if (existingCategory) {
					product.category = existingCategory;
					await productsRepo.save(product);
				}
			}
		}

		// STEP 4: set CategoryAttributes data
		for (const data of categoryAttributeData) {
			const existingCategory = await categoriesRepo.createQueryBuilder('c')
				.where('c.name = :name', { name: data.category })
				.getOne();

			const existingAttributeName = await attributeNamesRepo.createQueryBuilder('an')
				.where('an.name = :name', { name: data.attributeName })
				.getOne();

			const existingCARow = await categoryAttributeRepo.createQueryBuilder('ca')
				.where('ca.categoryId = :caid', { caid: existingCategory.id })
				.andWhere('ca.attributeNameId = :id', { id: existingAttributeName.id })
				.getOne();

			if (!existingCARow) {
				const newRow = categoryAttributeRepo.create({
					category: existingCategory,
					attributeName: existingAttributeName,
				});
				await categoryAttributeRepo.save(newRow);
			}
		}

		// STEP 5: set ProductAttributeNames data
		for (const data of productAttributeNameData) {
			const product = await productsRepo.createQueryBuilder('pr')
				.where('pr.name = :name', { name: data.product })
				.getOne();
			const attribute = await attributeNamesRepo.createQueryBuilder('a')
				.where('a.name = :name', { name: data.categoryAttribute })
				.getOne();

			const attributeCategory = await categoryAttributeRepo.createQueryBuilder('ca')
				.where('ca.attributeNameId = :id', { id: attribute.id })
				.getOne();

			if (product && attribute) {
				const existingRow = await productAttributeNameRepo.createQueryBuilder('p')
					.where('p.productId = :pid', { pid: product.id })
					.andWhere('p.categoryAttributeId = :cid', { cid: attributeCategory.id })
					.andWhere('p.value = :value', { value: data.value })
					.getOne();

				if (!existingRow) {
					const newRow = productAttributeNameRepo.create({
						product: product,
						categoryAttribute: attributeCategory,
						value: data.value,
					});
					await productAttributeNameRepo.save(newRow);
				}
			}
		}

		console.log('=== Mock data generated! ===');
	} catch (error) {
		console.error('=== Error during Data Source initialization ===', error);
	}
}
seedTableData();

