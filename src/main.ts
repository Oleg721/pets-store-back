import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// https://docs.nestjs.com/openapi/introduction
	// While the application is running, open your browser and navigate to http://localhost:3000/api. 
	// You should see the Swagger UI.

	const config = new DocumentBuilder()
		.setTitle('Pets store example')
		.setDescription('The pats API description')
		.setVersion('1.0')
		.addServer(process.env.API_URL)
		.addTag('pets')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.setGlobalPrefix('api/v1');

	app.enableCors();
	({
		origin: [process.env.API_URL],
		allowedHeaders: [
			'Accept',
			'Content-Type',
			'Origin',
			'api_key',
			'authorization',
			'x-requested-with',
			'Access-Control-Allow-Origin',
			'Referer',
			'Host',
		],
	});

	await app.listen(process.env.PORT);
}
bootstrap();
