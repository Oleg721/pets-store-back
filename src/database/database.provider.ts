import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseProviders = {
	provide: 'dataSource',
	useFactory: async (configService: ConfigService) => {
		const dbConf = configService.get<DataSourceOptions>('database');
		const dataSource = new DataSource({
			...dbConf,
			entities: [__dirname + '/../entities/!(base).entity.js'],
			synchronize: true,
		});
		return dataSource.initialize();
	},
	inject: [ConfigService],
};
