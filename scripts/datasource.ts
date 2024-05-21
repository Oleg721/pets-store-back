import { DataSource } from "typeorm"
import configuration from '../src/config/configuration';
import { loadEnvVariables } from "./init.env";

loadEnvVariables()
const dbConf = configuration().database;

export const AppDataSource = new DataSource({
    ...dbConf,
    synchronize: false,
    logging: true,
    entities: [__dirname + './../src/entities/!(base).entity.*(ts|js)'],
    migrations: [__dirname + '/../migrations/*.ts'],
    migrationsTableName: "migration_table",
})

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
		console.log('Migrations:', AppDataSource.migrations);
	})
	.catch((err) => {
		console.error('Error during Data Source initialization:', err);
	});
