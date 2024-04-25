import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { User } from './entities/user.entity';
import { AttributeName } from './entities/attributeName.entity';
import { Category } from './entities/category.entity';
import { ProductAttributeName } from './entities/productAttributeName.entity';
import { Product } from './entities/product.entity';
import { CategoryAttribute } from './entities/categoryAttribute.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			ignoreEnvFile: false,
			isGlobal: true,
			load: [configuration],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
				return {
					type: configService.get<'mysql' | 'postgres'>('database.type'),
					host: configService.get<string>('database.host'),
					port: configService.get<number>('database.port'),
					username: configService.get<string>('database.username'),
					password: configService.get<string>('database.password'),
					database: configService.get<string>('database.database'),
					synchronize: true, // shouldn't be used in production - otherwise we can lose production data.
					autoLoadEntities: true, // to automatically load entities,
					logging: true,

					entities: [User, AttributeName, CategoryAttribute, Category, ProductAttributeName, Product],
				};
			},
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
