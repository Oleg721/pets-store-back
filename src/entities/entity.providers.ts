import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const EntityProviders = [
	{
		provide: 'userRepository',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
		inject: ['dataSource'],
	},
];
