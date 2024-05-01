import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			ignoreEnvFile: false,
			isGlobal: true,
			load: [configuration],
		}),
		UsersModule,
		AuthModule,
		ProductModule,
		CategoryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
