enum ProductStatus {
	AVAILABLE = 'available',
	RESERVED = 'reserved', // don't show to the user
	SOLD = 'sold',
	MODERATING = 'moderating',
}

class CreateProductDto {
	name: string;
	description: string;
	status?: ProductStatus;
	price: number;
	categoryId: number;
	productAttributes?: Record<string, string | number | Date>;
}

const malePetNames = [
	'Max',
	'Charlie',
	'Buddy',
	'Jack',
	'Rocky',
	'Duke',
	'Cooper',
	'Bear',
	'Tucker',
	'Oliver',
	'Milo',
	'Leo',
	'Bentley',
	'Zeus',
	'Louie',
	'Sam',
	'Oscar',
	'Finn',
	'Rusty',
	'Gus',
	'Jake',
	'Apollo',
	'Rex',
	'Marley',
	'Murphy',
	'Harley',
	'Bruno',
	'Winston',
	'Henry',
	'Shadow',
	'Simba',
	'George',
	'Teddy',
	'Jasper',
	'Benji',
	'Thor',
	'Hunter',
	'Smokey',
	'Bailey',
	'Cody',
	'Zeke',
	'Riley',
	'Blue',
	'Ace',
	'Diesel',
	'Zeppelin',
	'Buster',
	'Chance',
	'Archie',
	'Rocco',
];

const femalePetNames = [
	'Bella',
	'Luna',
	'Lucy',
	'Daisy',
	'Molly',
	'Sadie',
	'Lola',
	'Maggie',
	'Sophie',
	'Chloe',
	'Bailey',
	'Zoe',
	'Lily',
	'Rosie',
	'Stella',
	'Ruby',
	'Penny',
	'Coco',
	'Gracie',
	'Mia',
	'Lulu',
	'Pepper',
	'Emma',
	'Willow',
	'Millie',
	'Ginger',
	'Annie',
	'Harley',
	'Sasha',
	'Roxy',
	'Princess',
	'Hazel',
	'Abby',
	'Callie',
	'Nala',
	'Izzy',
	'Sandy',
	'Angel',
	'Phoebe',
	'Samantha',
	'Olive',
	'Ella',
	'Cookie',
	'Lexi',
	'Scout',
	'Minnie',
	'Dixie',
	'Josie',
	'Winnie',
	'Holly',
];

const colorNames = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "black",
    "white",
    "gray",
    "teal",
    "cyan",
    "magenta",
    "lavender",
    "maroon",
    "turquoise",
    "navy",
    "gold",
    "silver"
];

const petAccessoryNames = [
	'Dog leash',
	'Cat collar',
	'Pet toy',
	'Food bowl',
	'Pet bed',
	'Scratching post',
	'Interactive tunnel',
	'Small animal chew toy',
	'Bird cage',
	'Bird feeder',
	'Terrarium',
	'Aquarium',
	'Small animal enclosure',
	'Muzzle',
	'Fluffy blanket',
	'Pet house',
	'Cage liner',
	'Pet first aid kit',
	'Portable water bottle',
	'UV protection sunglasses',
	'Rope ball toy',
	'Pet carrier',
	'Deterrent pouch for walking cat',
	'Waterproof dog coat',
	'Family photo session costume set',
	'Soft cat sleeping mats',
	'Grooming massage glove',
	'Chirping bird toy to stimulate hunting instinct',
	'Hamster and rat exercise wheel',
	'Warm dog boots for winter',
	'Inflatable safety swimming ring',
	'Knitted dog sweater',
	'Pet travel bag',
	'Pet stroller',
	'Pet cooling mat',
	'Cat litter box',
	'Dog training clicker',
	'Rabbit hutch',
	'Reptile heat lamp',
	'Puppy training pad',
	'Fish tank filter',
	'Reflective dog collar',
	'Automatic pet feeder',
	'Cat tree tower',
	'GPS pet tracker',
	'Flea and tick collar',
	'Pet waste bags',
	'Interactive treat dispenser',
	'Pet grooming scissors',
];

const petFoods = [
	'Hearty Hound',
	'Purrfect Paws',
	'Tasty Tailwaggers',
	'Whisker Wonderland',
	'Happy Hoppers',
	'Bark Bistro',
	'Meow Manor',
	'Chewy Delights',
	'Tail-Wagging Treats',
	"Pawlickin' Good",
	'Furry Feast',
	'Wholesome Hound',
	'Meatball Mania',
	'Pounce & Crunch',
	'Yummy Yowlers',
	'Nutri-Nibbles',
	'Pet Delights',
	'Fuzzy Favorites',
	'Tummy Ticklers',
	'Snoutfuls of Joy',
	'Meat Munchies',
	'Purrfectly Balanced',
	'Fluff & Nibbles',
	'Happy Tails',
	'Crunchy Critters',
	'Feathered Friends Feast',
	'Paw-licking Protein',
	'Treats Galore',
	'Bark Box',
	'Feline Fine Dining',
	'Snack Shack',
	'Tails Up',
	'Whisker Whirlwind',
	'Bite-Size Bliss',
	'Furry Friends Fiesta',
	'Whisker Wonders',
	'Snacktime Specials',
	'Pet Paradise',
	'Savor the Flavor',
	'Critter Cuisine',
	'Bark Boosters',
	'Pawsitively Delicious',
	'Feathered Feasts',
	'Crunchy Canine',
	'Feline Favorites',
	'Pet Palate Pleasers',
	'Paws & Claws Cuisine',
	'Meat Medley',
	'Happy Hoppers',
	'Treats Ahoy!',
];

const petBreedByCategory = {
	cat: [
		"maine coon",
		"siamese",
		"persian",
		"bengal",
		"sphynx",
		"ragdoll",
		"british shorthair",
		"scottish fold",
		"abyssinian",
		"birman",
		"ukrainian yellow",
		"siberian",
		"oriental",
		"american shorthair",
		"devon rex",
		"cornish rex",
		"burmese",
		"himalayan",
		"manx",
		"norwegian forest",
		"turkish angora",
		"turkish van",
		"exotic shorthair",
		"bombay",
		"tonkinese",
		"chartreux",
		"havana brown",
		"japanese bobtail",
		"somali",
		"munchkin"
	],
	dog: [
		"labrador retriever",
		"german shepherd",
		"golden retriever",
		"french bulldog",
		"bulldog",
		"poodle",
		"beagle",
		"rottweiler",
		"yorkshire terrier",
		"dachshund",
		"boxer",
		"siberian husky",
		"doberman pinscher",
		"great dane",
		"shih tzu",
		"australian shepherd",
		"cavalier king charles spaniel",
		"miniature schnauzer",
		"akita inu",
		"golden retriever",
		"pomeranian",
		"shetland sheepdog",
		"boston terrier",
		"pembroke welsh corgi",
		"havanese",
		"shiba inu",
		"basset hound",
		"bernese mountain dog",
		"brittany",
		"weimaraner",
		"bichon frise",
		"vizsla"
	],
	rabbit: [
		"holland lop",
		"mini lop",
		"lionhead",
		"netherland dwarf",
		"flemish giant",
		"rex",
		"angora",
		"english lop",
		"polish",
		"jersey wooly"
	],
	birds: [
		"budgerigar",
		"cockatiel",
		"lovebird",
		"canary",
		"finch",
		"parakeet",
		"cockatoo",
		"african grey parrot",
		"amazon parrot",
		"macaw",
		"conure",
		"quaker parrot",
		"pigeon",
		"dove",
		"bantam",
		"silkie chicken",
		"rhode island red chicken",
		"pekin duck",
		"kiev duck",
		"goose",
		"turkey",
		"peacock"
	],
};

const brands = [
    "apple",
    "samsung",
    "nike",
    "adidas",
    "sony",
    "google",
    "microsoft",
    "amazon",
    "coca-cola",
    "toyota",
    "bmw",
    "mercedes-benz",
    "ford",
    "louis vuitton",
    "gucci",
    "prada",
    "rolex",
    "canon",
    "panasonic",
    "philips",
    "lenovo",
    "dell",
    "hp",
    "tiffany & co.",
    "chanel",
    "burberry",
    "l'oreal",
    "h&m",
    "zara",
    "gap"
];

const petFoodBrands = [
    "royal canin",
    "hill's science diet",
    "purina pro plan",
    "blue buffalo",
    "iams",
    "pedigree",
    "eukanuba",
    "wellness",
    "natural balance",
    "merrick",
    "taste of the wild",
    "acana",
    "orijen",
    "instinct",
    "canidae",
    "nutro",
    "nature's variety",
    "fromm",
    "fancy feast",
    "friskies",
    "rachael ray nutrish",
    "solid gold",
    "halo",
    "nulo",
    "science diet",
    "purina one",
    "evanger's",
    "diamond naturals",
    "4health",
    "trader joe's"
];

const materials = [
    "cotton",
    "wool",
    "silk",
    "leather",
    "wood",
    "metal",
    "glass",
    "plastic",
    "ceramic",
    "concrete",
    "paper",
    "rubber",
    "nylon",
    "stone",
    "iron",
    "aluminum",
    "bronze",
    "steel",
    "cord",
    "carbon"
];

function getRandomElement(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

function getRandomFloat(from, to) {
	const randomFloat = Math.random() * (to - from) + from;
	return parseFloat(randomFloat.toFixed(2));
}

function getRandomDate(from, to) {
	const fromDate = new Date(from);
	const toDate = new Date(to);
	const randomTimestamp =
		fromDate.getTime() +
		Math.random() * (toDate.getTime() - fromDate.getTime());
	const randomDate = new Date(randomTimestamp);

	const year = randomDate.getFullYear();
	let month: string | number = randomDate.getMonth() + 1;
	month = month < 10 ? '0' + month : month;
	let day: string | number = randomDate.getDate();
	day = day < 10 ? '0' + day : day;

	return `${year}-${month}-${day}`;
}

export const generateProducts = (
	categoriesData,
	categoryMap,
	parentCategory,
	count = 10
) => {
	let products: CreateProductDto[] = [];

	for (let i = 0; i <= count; i++) {
		const { name, attributeNames } = getRandomElement(categoriesData);

		const product = new CreateProductDto();

		product.categoryId = categoryMap[name];
		product.description = `Description for ${name} product`;
		product.price = getRandomFloat(1, 500);
		product.productAttributes = fillAttributes(
			attributeNames,
			name,
			parentCategory
		);

		switch (parentCategory) {
			case 'pet': {
				if (product.productAttributes.sex === undefined) {
					product.name = getRandomElement([...malePetNames, ...femalePetNames]);
				} else if (product.productAttributes.sex === 'male') {
					product.name = getRandomElement(malePetNames);
				} else {
					product.name = getRandomElement(femalePetNames);
				}
				break;
			}
			case 'accessories': {
				product.name = getRandomElement(petAccessoryNames);
				break;
			}
			case 'food': {
				product.name = getRandomElement(petFoods);
				break;
			}
		}

		products.push(product);
	}

	return products;
};

function fillAttributes(attributesArr: any[], categoryName, parentCategory) {
	let attributes: Record<string, string | number | Date> = {};

	const sex = attributesArr.find((e) => e === 'sex');
	if (sex) {
		attributes.sex = getRandomElement(['male', 'female']);
	}

	attributesArr
		.filter((e) => e != 'sex')
		.forEach((e) => {
			switch (e) {
				case 'color': {
					attributes.color = getRandomElement(colorNames);
					return;
				}
				case 'size': {
					attributes.size = getRandomElement(['small', 'medium', 'large']);
					return;
				}
				case 'birthDate': {
					attributes.birthDate = getRandomDate('2019-01-01', '2024-03-31');
					return;
				}
				case 'breed': {
					if (petBreedByCategory[categoryName]) {
						attributes.breed = getRandomElement(
							petBreedByCategory[categoryName]
						);
					}
					return;
				}
				case 'brand': {
					if (parentCategory === 'accessories') {
						attributes.brand = getRandomElement(brands);
					}
					if (parentCategory === 'food') {
						attributes.brand = getRandomElement(petFoodBrands);
					}
					return;
				}

				case 'material': {
					attributes.material = getRandomElement(materials);
					return;
				}

				case 'lifestage': {
					attributes.lifestage = getRandomElement([
						'adult',
						'mature',
						'junior',
					]);
					return;
				}
				case 'weight': {
					attributes.weight = getRandomFloat(0.5, 10);
					return;
				}
				case 'packSize': {
					attributes.packSize = getRandomElement([
						'cans',
						'large bags',
						'multipacks',
						'pouches',
						'small bags',
						'medium bags',
					]);
					return;
				}
				default: {
					return;
				}
			}
		});
	return attributes;
}
