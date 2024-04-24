import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';

const defaultOptions = {
	type: process.env.DB_TYPE || 'postgres',
	port: process.env.DB_PORT || '5432',
	username: process.env.DB_USERNAME || 'postgres',
	password: process.env.DB_PASSWORD || 'Flo1lilly95', // on purpose, store sensitive data is insecure even if it's a default
	database: process.env.DB_NAME || 'pets-db',
	autoLoadEntities: true, // to automatically load entities
	synchronize: true, // shouldn't be used in production - otherwise we can lose production data.
};

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(defaultOptions as TypeOrmModuleOptions),
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
